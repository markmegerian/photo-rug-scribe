import { useState, useEffect } from 'react';
import { Save, X, Twitter, Linkedin, Instagram, Facebook, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  SocialPost, 
  SocialPlatform, 
  SocialPostStatus, 
  PLATFORM_LIMITS, 
  PLATFORM_LABELS,
  generatePostId 
} from '@/lib/socialPosts';

const platformIcons: Record<SocialPlatform, React.ElementType> = {
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
  facebook: Facebook,
  tiktok: Video,
};

interface SocialPostEditorProps {
  post: SocialPost | null;
  isCreating: boolean;
  onSave: (post: SocialPost) => void;
  onCancel: () => void;
}

export default function SocialPostEditor({ post, isCreating, onSave, onCancel }: SocialPostEditorProps) {
  const [formData, setFormData] = useState<SocialPost>({
    id: '',
    platform: 'twitter',
    content: '',
    mediaUrl: '',
    hashtags: [],
    scheduledFor: '',
    status: 'draft',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    notes: '',
  });
  
  const [hashtagInput, setHashtagInput] = useState('');

  useEffect(() => {
    if (post) {
      setFormData(post);
      setHashtagInput(post.hashtags.join(', '));
    } else if (isCreating) {
      setFormData({
        id: '',
        platform: 'twitter',
        content: '',
        mediaUrl: '',
        hashtags: [],
        scheduledFor: '',
        status: 'draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        notes: '',
      });
      setHashtagInput('');
    }
  }, [post, isCreating]);

  const handleHashtagChange = (value: string) => {
    setHashtagInput(value);
    const tags = value
      .split(/[,\s]+/)
      .map(tag => tag.replace(/^#/, '').trim())
      .filter(Boolean);
    setFormData({ ...formData, hashtags: tags });
  };

  const handleSave = () => {
    const now = new Date().toISOString();
    const savedPost: SocialPost = {
      ...formData,
      id: formData.id || generatePostId(),
      updatedAt: now,
      createdAt: formData.createdAt || now,
    };
    onSave(savedPost);
  };

  const charLimit = PLATFORM_LIMITS[formData.platform];
  const charCount = formData.content.length;
  const isOverLimit = charCount > charLimit;
  const PlatformIcon = platformIcons[formData.platform];

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PlatformIcon className="h-5 w-5" />
          {isCreating ? 'Create Social Post' : 'Edit Social Post'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Platform & Status Row */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="platform">Platform</Label>
            <Select 
              value={formData.platform} 
              onValueChange={(value: SocialPlatform) => setFormData({ ...formData, platform: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(PLATFORM_LABELS) as SocialPlatform[]).map(platform => {
                  const Icon = platformIcons[platform];
                  return (
                    <SelectItem key={platform} value={platform}>
                      <span className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        {PLATFORM_LABELS[platform]}
                      </span>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select 
              value={formData.status} 
              onValueChange={(value: SocialPostStatus) => setFormData({ ...formData, status: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="content">Content</Label>
            <span className={`text-xs ${isOverLimit ? 'text-destructive font-medium' : 'text-muted-foreground'}`}>
              {charCount.toLocaleString()} / {charLimit.toLocaleString()}
            </span>
          </div>
          <Textarea
            id="content"
            value={formData.content}
            onChange={e => setFormData({ ...formData, content: e.target.value })}
            placeholder="Write your post content..."
            rows={5}
            className={isOverLimit ? 'border-destructive focus-visible:ring-destructive' : ''}
          />
          {isOverLimit && (
            <p className="text-xs text-destructive">
              Content exceeds the {charLimit.toLocaleString()} character limit for {PLATFORM_LABELS[formData.platform]}
            </p>
          )}
        </div>

        {/* Hashtags */}
        <div className="space-y-2">
          <Label htmlFor="hashtags">Hashtags</Label>
          <Input
            id="hashtags"
            value={hashtagInput}
            onChange={e => handleHashtagChange(e.target.value)}
            placeholder="Enter hashtags separated by commas (e.g., Marketing, Business, AI)"
          />
          {formData.hashtags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {formData.hashtags.map((tag, i) => (
                <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Media & Schedule Row */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="mediaUrl">Media URL (optional)</Label>
            <Input
              id="mediaUrl"
              value={formData.mediaUrl || ''}
              onChange={e => setFormData({ ...formData, mediaUrl: e.target.value })}
              placeholder="https://example.com/image.jpg"
            />
            {formData.mediaUrl && (
              <div className="w-20 h-20 rounded border overflow-hidden bg-muted">
                <img 
                  src={formData.mediaUrl} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="scheduledFor">Schedule Date (optional)</Label>
            <Input
              id="scheduledFor"
              type="date"
              value={formData.scheduledFor || ''}
              onChange={e => setFormData({ ...formData, scheduledFor: e.target.value })}
            />
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <Label htmlFor="notes">Internal Notes (optional)</Label>
          <Textarea
            id="notes"
            value={formData.notes || ''}
            onChange={e => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Add private notes about this post..."
            rows={2}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-4">
          <Button onClick={handleSave} className="gap-2" disabled={isOverLimit}>
            <Save className="h-4 w-4" />
            Save Post
          </Button>
          <Button variant="outline" onClick={onCancel} className="gap-2">
            <X className="h-4 w-4" />
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
