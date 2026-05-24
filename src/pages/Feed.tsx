import { AppLayout } from '@/components/AppLayout';
import { PostCard } from '@/components/PostCard';
import { ProfileCard } from '@/components/ProfileCard';
import { usePosts } from '@/hooks/usePosts';
import { mockUsers } from '@/data/mockData';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function Feed() {
  const { posts, likePost, savePost } = usePosts();
  const navigate = useNavigate();
  const suggestions = mockUsers.slice(0, 3);

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto px-4 py-6">
        <header className="flex items-center justify-between mb-6 md:hidden">
          <h1 className="text-2xl font-display font-bold text-gradient">Cene-Connect</h1>
          <Button variant="ghost" size="icon" onClick={() => navigate('/notifications')}>
            <Bell className="h-5 w-5" />
          </Button>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
          <div className="space-y-6">
            {posts.map(post => (
              <PostCard key={post.id} post={post} onLike={likePost} onSave={savePost} />
            ))}
          </div>

          <aside className="hidden lg:block space-y-4">
            <h3 className="font-semibold text-sm text-muted-foreground">Suggested for you</h3>
            {suggestions.map(user => (
              <ProfileCard key={user.id} user={user} compact onClick={() => navigate(`/profile/${user.id}`)} />
            ))}
          </aside>
        </div>
      </div>
    </AppLayout>
  );
}
