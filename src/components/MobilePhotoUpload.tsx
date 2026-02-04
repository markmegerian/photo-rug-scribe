import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Camera, ImagePlus, X, Upload, RotateCcw, Check, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface PhotoItem {
  id: string;
  file: File;
  preview: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
}

interface MobilePhotoUploadProps {
  photos: File[];
  onPhotosChange: (photos: File[]) => void;
  maxPhotos?: number;
  className?: string;
  showProgress?: boolean;
  uploadProgress?: {
    total: number;
    completed: number;
    percentage: number;
  } | null;
  disabled?: boolean;
}

const MobilePhotoUpload: React.FC<MobilePhotoUploadProps> = ({
  photos,
  onPhotosChange,
  maxPhotos = 10,
  className,
  showProgress = false,
  uploadProgress,
  disabled = false,
}) => {
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const [photoItems, setPhotoItems] = useState<PhotoItem[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [failedUploads, setFailedUploads] = useState<string[]>([]);

  // Sync external photos to internal state (for initial load)
  useEffect(() => {
    if (photos.length > 0 && photoItems.length === 0) {
      const items: PhotoItem[] = photos.map((file, index) => ({
        id: `existing-${index}-${Date.now()}`,
        file,
        preview: URL.createObjectURL(file),
        status: 'success' as const,
      }));
      setPhotoItems(items);
    }
  }, [photos, photoItems.length]);

  // Cleanup previews on unmount
  useEffect(() => {
    return () => {
      photoItems.forEach(item => URL.revokeObjectURL(item.preview));
    };
  }, []);

  const addPhotos = useCallback((files: File[]) => {
    const remainingSlots = maxPhotos - photoItems.length;
    const newFiles = files.slice(0, remainingSlots);
    
    if (newFiles.length === 0) return;

    const newItems: PhotoItem[] = newFiles.map((file, index) => ({
      id: `photo-${Date.now()}-${index}`,
      file,
      preview: URL.createObjectURL(file),
      status: 'pending' as const,
    }));

    setPhotoItems(prev => {
      const updated = [...prev, ...newItems];
      // Sync to parent
      onPhotosChange(updated.map(item => item.file));
      return updated;
    });
  }, [maxPhotos, photoItems.length, onPhotosChange]);

  const handleCameraCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    addPhotos(files);
    // Reset input
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  const handleGallerySelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    addPhotos(files);
    // Reset input
    if (galleryInputRef.current) galleryInputRef.current.value = '';
  };

  const removePhoto = (id: string) => {
    setPhotoItems(prev => {
      const item = prev.find(p => p.id === id);
      if (item) URL.revokeObjectURL(item.preview);
      const updated = prev.filter(p => p.id !== id);
      onPhotosChange(updated.map(item => item.file));
      return updated;
    });
    setFailedUploads(prev => prev.filter(fid => fid !== id));
  };

  const retryUpload = (id: string) => {
    setPhotoItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, status: 'pending' as const, error: undefined } : item
      )
    );
    setFailedUploads(prev => prev.filter(fid => fid !== id));
  };

  // Drag and drop handlers (optional enhancement for desktop)
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
    addPhotos(files);
  };

  const openCamera = () => cameraInputRef.current?.click();
  const openGallery = () => galleryInputRef.current?.click();

  const remainingSlots = maxPhotos - photoItems.length;
  const hasPhotos = photoItems.length > 0;

  return (
    <div className={cn("space-y-4", className)}>
      {/* Hidden inputs */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleCameraCapture}
        className="hidden"
        disabled={disabled}
      />
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleGallerySelect}
        className="hidden"
        disabled={disabled}
      />

      {/* Header with count and action buttons */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">
          Photos ({photoItems.length}/{maxPhotos})
        </label>
        {remainingSlots > 0 && !disabled && (
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={openCamera}
              className="gap-1.5"
            >
              <Camera className="h-4 w-4" />
              <span className="hidden sm:inline">Camera</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={openGallery}
              className="gap-1.5"
            >
              <ImagePlus className="h-4 w-4" />
              <span className="hidden sm:inline">Gallery</span>
            </Button>
          </div>
        )}
      </div>

      {/* Upload progress bar */}
      {showProgress && uploadProgress && (
        <div className="space-y-2 p-3 rounded-lg bg-muted/50 border">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              {uploadProgress.percentage === 100 ? (
                <Check className="h-4 w-4 text-primary" />
              ) : (
                <Upload className="h-4 w-4 text-muted-foreground animate-pulse" />
              )}
              <span className="font-medium">
                {uploadProgress.percentage === 100 ? 'Upload complete!' : 'Uploading...'}
              </span>
            </div>
            <span className="text-muted-foreground tabular-nums">
              {uploadProgress.completed}/{uploadProgress.total}
            </span>
          </div>
          <Progress value={uploadProgress.percentage} className="h-2" />
        </div>
      )}

      {/* Failed uploads warning */}
      {failedUploads.length > 0 && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{failedUploads.length} photo(s) failed to upload. Tap to retry.</span>
        </div>
      )}

      {/* Empty state with drag-drop zone (optional) */}
      {!hasPhotos && (
        <div
          onClick={openCamera}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed p-8 cursor-pointer transition-all duration-200",
            isDragOver 
              ? "border-primary bg-primary/10" 
              : "border-border bg-muted/30 hover:border-primary/50 hover:bg-muted/50",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <div className="rounded-full bg-primary/10 p-4">
            <Camera className="h-8 w-8 text-primary" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">Tap to take a photo</p>
            <p className="text-xs text-muted-foreground mt-1">
              or select from gallery • drag & drop supported
            </p>
          </div>
          <div className="flex gap-2 mt-2">
            <Button
              type="button"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                openCamera();
              }}
              className="gap-1.5"
              disabled={disabled}
            >
              <Camera className="h-4 w-4" />
              Camera
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                openGallery();
              }}
              className="gap-1.5"
              disabled={disabled}
            >
              <ImagePlus className="h-4 w-4" />
              Gallery
            </Button>
          </div>
        </div>
      )}

      {/* Photo thumbnails grid */}
      {hasPhotos && (
        <div 
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {photoItems.map((item, index) => (
            <div
              key={item.id}
              className={cn(
                "relative aspect-square rounded-lg overflow-hidden bg-muted shadow-sm animate-in fade-in zoom-in-95 duration-200",
                item.status === 'error' && "ring-2 ring-destructive"
              )}
            >
              <img
                src={item.preview}
                alt={`Photo ${index + 1}`}
                className="w-full h-full object-cover"
              />
              
              {/* Status overlay */}
              {item.status === 'uploading' && (
                <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              )}
              
              {item.status === 'error' && (
                <button
                  type="button"
                  onClick={() => retryUpload(item.id)}
                  className="absolute inset-0 bg-destructive/80 flex flex-col items-center justify-center gap-1 text-destructive-foreground"
                >
                  <RotateCcw className="h-5 w-5" />
                  <span className="text-xs font-medium">Retry</span>
                </button>
              )}
              
              {/* Remove button */}
              {item.status !== 'uploading' && (
                <button
                  type="button"
                  onClick={() => removePhoto(item.id)}
                  className="absolute top-1 right-1 rounded-full bg-foreground/80 p-1 text-background hover:bg-foreground transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
              
              {/* Photo number badge */}
              <div className="absolute bottom-1 left-1 rounded-full bg-foreground/70 px-1.5 py-0.5 text-[10px] text-background font-medium">
                {index + 1}
              </div>
              
              {/* Success indicator */}
              {item.status === 'success' && (
                <div className="absolute top-1 left-1 rounded-full bg-primary p-0.5">
                  <Check className="h-2.5 w-2.5 text-primary-foreground" />
                </div>
              )}
            </div>
          ))}
          
          {/* Add more button */}
          {remainingSlots > 0 && !disabled && (
            <button
              type="button"
              onClick={openCamera}
              className="aspect-square rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-primary/50 hover:bg-muted/30 transition-all"
            >
              <Camera className="h-5 w-5 text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground">Add</span>
            </button>
          )}
        </div>
      )}

      {/* Drag overlay */}
      {isDragOver && hasPhotos && (
        <div className="fixed inset-0 z-50 bg-primary/20 backdrop-blur-sm flex items-center justify-center pointer-events-none">
          <div className="bg-card rounded-xl p-8 shadow-xl border-2 border-primary border-dashed">
            <div className="text-center">
              <Upload className="h-12 w-12 text-primary mx-auto mb-3" />
              <p className="text-lg font-medium">Drop photos here</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobilePhotoUpload;
