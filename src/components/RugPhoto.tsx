import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { ImageOff } from 'lucide-react';
import { useSignedUrl } from '@/hooks/useSignedUrl';

interface RugPhotoProps {
  /** Storage file path (e.g., "userId/timestamp-random-filename.jpg") or legacy signed URL */
  filePath: string | null | undefined;
  alt?: string;
  className?: string;
  /** Fallback to show while loading */
  loadingClassName?: string;
}

/**
 * Extracts the file path from a signed URL if needed.
 * Signed URLs contain the path between "/rug-photos/" and "?token="
 */
const extractFilePath = (input: string): string => {
  // If it's already a path (doesn't start with http), return as-is
  if (!input.startsWith('http')) {
    return input;
  }

  // Extract path from signed URL: .../rug-photos/path/to/file?token=...
  const match = input.match(/\/rug-photos\/([^?]+)/);
  if (match && match[1]) {
    return decodeURIComponent(match[1]);
  }

  // Fallback: return the original (might fail, but let the hook handle the error)
  return input;
};

/**
 * RugPhoto component that displays rug photos using on-demand signed URLs.
 * 
 * This component solves the expired URL problem by:
 * 1. Accepting a storage file path (not a pre-signed URL)
 * 2. Generating a fresh signed URL on-demand using useSignedUrl hook
 * 3. Automatically refreshing the URL before it expires
 * 
 * For backward compatibility, it also handles legacy signed URLs by
 * extracting the file path from them.
 */
const RugPhoto: React.FC<RugPhotoProps> = ({
  filePath,
  alt = 'Rug photo',
  className = 'w-full h-auto object-cover',
  loadingClassName = 'w-full h-32',
}) => {
  // Extract file path if a full URL was passed (backward compatibility)
  const cleanPath = filePath ? extractFilePath(filePath) : null;
  
  const { signedUrl, loading, error } = useSignedUrl(cleanPath, {
    bucket: 'rug-photos',
    expiresIn: 3600, // 1 hour, auto-refreshes before expiry
  });

  // Loading state
  if (loading && !signedUrl) {
    return (
      <Skeleton className={loadingClassName} />
    );
  }

  // Error or no path state
  if (error || !signedUrl) {
    return (
      <div className={`flex items-center justify-center bg-muted/50 rounded-lg ${loadingClassName}`}>
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <ImageOff className="h-8 w-8" />
          <span className="text-xs">Image unavailable</span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={signedUrl}
      alt={alt}
      className={className}
      loading="lazy"
    />
  );
};

export default RugPhoto;
