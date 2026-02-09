import { useState, useEffect } from 'react';
import { Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  SocialPost, 
  SocialPlatform, 
  SocialPostStatus,
  PLATFORM_LABELS,
  getSocialPosts, 
  saveSocialPosts,
  generatePostId 
} from '@/lib/socialPosts';
import SocialPostCard from './SocialPostCard';
import SocialPostEditor from './SocialPostEditor';

export default function SocialContentTab() {
  const { toast } = useToast();
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [editingPost, setEditingPost] = useState<SocialPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [platformFilter, setPlatformFilter] = useState<SocialPlatform | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<SocialPostStatus | 'all'>('all');

  useEffect(() => {
    setPosts(getSocialPosts());
  }, []);

  const filteredPosts = posts.filter(post => {
    if (platformFilter !== 'all' && post.platform !== platformFilter) return false;
    if (statusFilter !== 'all' && post.status !== statusFilter) return false;
    return true;
  });

  const handleCreate = () => {
    setIsCreating(true);
    setEditingPost(null);
  };

  const handleEdit = (post: SocialPost) => {
    setIsCreating(false);
    setEditingPost(post);
  };

  const handleDuplicate = (post: SocialPost) => {
    const duplicated: SocialPost = {
      ...post,
      id: generatePostId(),
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: post.notes ? `Duplicated from: ${post.notes}` : 'Duplicated post',
    };
    const updatedPosts = [duplicated, ...posts];
    saveSocialPosts(updatedPosts);
    setPosts(updatedPosts);
    toast({
      title: "Post duplicated",
      description: "A copy has been created as a draft.",
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    const updatedPosts = posts.filter(p => p.id !== id);
    saveSocialPosts(updatedPosts);
    setPosts(updatedPosts);
    toast({
      title: "Post deleted",
      description: "The social post has been removed.",
    });
  };

  const handleSave = (post: SocialPost) => {
    const isNew = !posts.find(p => p.id === post.id);
    const updatedPosts = isNew 
      ? [post, ...posts]
      : posts.map(p => p.id === post.id ? post : p);
    
    saveSocialPosts(updatedPosts);
    setPosts(updatedPosts);
    setEditingPost(null);
    setIsCreating(false);
    
    toast({
      title: isNew ? "Post created" : "Post updated",
      description: isNew ? "New social post has been saved." : "Your changes have been saved.",
    });
  };

  const handleCancel = () => {
    setEditingPost(null);
    setIsCreating(false);
  };

  return (
    <div className="space-y-6">
      {/* Header with filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={platformFilter} onValueChange={(v) => setPlatformFilter(v as SocialPlatform | 'all')}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              {(Object.keys(PLATFORM_LABELS) as SocialPlatform[]).map(platform => (
                <SelectItem key={platform} value={platform}>
                  {PLATFORM_LABELS[platform]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as SocialPostStatus | 'all')}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="published">Published</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleCreate} className="gap-2">
          <Plus className="h-4 w-4" />
          New Post
        </Button>
      </div>

      {/* Editor */}
      {(isCreating || editingPost) && (
        <SocialPostEditor
          post={editingPost}
          isCreating={isCreating}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}

      {/* Posts List */}
      <div className="space-y-3">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            {posts.length === 0 
              ? "No social posts yet. Create your first one!"
              : "No posts match your filters."
            }
          </div>
        ) : (
          filteredPosts.map(post => (
            <SocialPostCard
              key={post.id}
              post={post}
              onEdit={handleEdit}
              onDuplicate={handleDuplicate}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}
