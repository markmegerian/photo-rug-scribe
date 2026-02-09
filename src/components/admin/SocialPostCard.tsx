import { Twitter, Linkedin, Instagram, Facebook, Video, Clock, Check, FileText, Copy, Trash2, Edit } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SocialPost, SocialPlatform, PLATFORM_LABELS } from '@/lib/socialPosts';

const platformIcons: Record<SocialPlatform, React.ElementType> = {
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
  facebook: Facebook,
  tiktok: Video,
};

interface SocialPostCardProps {
  post: SocialPost;
  onEdit: (post: SocialPost) => void;
  onDuplicate: (post: SocialPost) => void;
  onDelete: (id: string) => void;
}

export default function SocialPostCard({ post, onEdit, onDuplicate, onDelete }: SocialPostCardProps) {
  const PlatformIcon = platformIcons[post.platform];
  
  const statusConfig = {
    draft: { label: 'Draft', className: 'bg-muted text-muted-foreground', icon: FileText },
    scheduled: { label: 'Scheduled', className: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400', icon: Clock },
    published: { label: 'Published', className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400', icon: Check },
  };
  
  const status = statusConfig[post.status];
  const StatusIcon = status.icon;
  
  const truncatedContent = post.content.length > 120 
    ? post.content.substring(0, 120) + '...' 
    : post.content;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          {/* Platform Icon */}
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <PlatformIcon className="h-5 w-5 text-primary" />
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium text-foreground">
                {PLATFORM_LABELS[post.platform]}
              </span>
              <Badge className={status.className} variant="secondary">
                <StatusIcon className="h-3 w-3 mr-1" />
                {status.label}
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
              {truncatedContent}
            </p>
            
            {post.hashtags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {post.hashtags.slice(0, 3).map((tag, i) => (
                  <span key={i} className="text-xs text-primary/80">
                    #{tag}
                  </span>
                ))}
                {post.hashtags.length > 3 && (
                  <span className="text-xs text-muted-foreground">
                    +{post.hashtags.length - 3} more
                  </span>
                )}
              </div>
            )}
            
            {post.scheduledFor && (
              <p className="text-xs text-muted-foreground">
                <Clock className="h-3 w-3 inline mr-1" />
                Scheduled: {new Date(post.scheduledFor).toLocaleDateString()}
              </p>
            )}
          </div>
          
          {/* Actions */}
          <div className="flex gap-1 flex-shrink-0">
            <Button variant="ghost" size="icon" onClick={() => onEdit(post)} title="Edit">
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => onDuplicate(post)} title="Duplicate">
              <Copy className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onDelete(post.id)} 
              className="text-destructive hover:text-destructive"
              title="Delete"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
