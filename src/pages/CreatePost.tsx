import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Image, Video, X, Upload } from 'lucide-react';
import { usePosts } from '@/hooks/usePosts';
import { toast } from 'sonner';

export default function CreatePost() {
  const navigate = useNavigate();
  const { createPost } = usePosts();
  const [content, setContent] = useState('');
  const [visibility, setVisibility] = useState<'public' | 'followers' | 'private'>('public');
  const [preview, setPreview] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!content.trim()) return toast.error('Please add some content');
    await createPost({ content, mediaUrls: preview ? [preview] : [], mediaType: 'image', visibility, tags: [] });
    toast.success('Post created!');
    navigate('/feed');
  };

  return (
    <AppLayout>
      <div className="max-w-xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-display font-bold">Create Post</h1>
          <Button onClick={handleSubmit} className="gradient-primary">Share</Button>
        </div>

        <div className="space-y-6">
          <Textarea placeholder="What's on your mind?" className="min-h-32 text-lg" value={content} onChange={e => setContent(e.target.value)} />

          {preview ? (
            <div className="relative rounded-xl overflow-hidden">
              <img src={preview} alt="Preview" className="w-full aspect-video object-cover" />
              <Button size="icon" variant="secondary" className="absolute top-2 right-2" onClick={() => setPreview(null)}><X className="h-4 w-4" /></Button>
            </div>
          ) : (
            <div className="border-2 border-dashed rounded-xl p-8 text-center">
              <Upload className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
              <p className="text-muted-foreground mb-4">Drag & drop or click to upload</p>
              <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={() => setPreview('https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=600&fit=crop')}><Image className="h-4 w-4 mr-2" />Photo</Button>
                <Button variant="outline"><Video className="h-4 w-4 mr-2" />Video</Button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label>Visibility</Label>
            <Select value={visibility} onValueChange={(v) => setVisibility(v as typeof visibility)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="followers">Followers Only</SelectItem>
                <SelectItem value="private">Private</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
