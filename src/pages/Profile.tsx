import { useParams } from 'react-router-dom';
import { AppLayout } from '@/components/AppLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockUsers, mockPosts, currentUser } from '@/data/mockData';
import { Settings, Grid, Bookmark, Link as LinkIcon, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Profile() {
  const { userId } = useParams();
  const user = userId ? mockUsers.find(u => u.id === userId) || currentUser : currentUser;
  const isOwnProfile = !userId || userId === currentUser.id;
  const userPosts = mockPosts.filter(p => p.userId === user.id);

  const roleColors: Record<string, string> = {
    director: 'bg-primary/10 text-primary',
    actor: 'bg-accent/10 text-accent',
    producer: 'bg-emerald-500/10 text-emerald-600',
    singer: 'bg-orange-500/10 text-orange-600',
    photographer: 'bg-cyan-500/10 text-cyan-600',
    videographer: 'bg-violet-500/10 text-violet-600',
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        {user.coverUrl && <div className="h-48 md:h-64 bg-muted"><img src={user.coverUrl} alt="" className="w-full h-full object-cover" /></div>}

        <div className="px-4 pb-6">
          <div className="flex flex-col md:flex-row md:items-end gap-4 -mt-16 md:-mt-12 mb-6">
            <Avatar className="h-32 w-32 ring-4 ring-background shadow-lg">
              <AvatarImage src={user.avatarUrl} />
              <AvatarFallback className="text-4xl">{user.displayName[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-display font-bold">{user.displayName}</h1>
                {user.isVerified && <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>}
              </div>
              <p className="text-muted-foreground mb-2">@{user.username}</p>
              <Badge className={cn("capitalize", roleColors[user.role])}>{user.role}</Badge>
            </div>
            {isOwnProfile ? (
              <Button variant="outline"><Settings className="h-4 w-4 mr-2" />Edit Profile</Button>
            ) : (
              <Button className="gradient-primary">Follow</Button>
            )}
          </div>

          <p className="mb-4">{user.bio}</p>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
            {user.location && <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{user.location}</span>}
            {user.portfolioUrl && <a href={user.portfolioUrl} className="flex items-center gap-1 text-primary hover:underline"><LinkIcon className="h-4 w-4" />Portfolio</a>}
          </div>

          <div className="flex gap-8 mb-6">
            <div><span className="font-bold">{user.postsCount}</span> <span className="text-muted-foreground">posts</span></div>
            <div><span className="font-bold">{user.followersCount.toLocaleString()}</span> <span className="text-muted-foreground">followers</span></div>
            <div><span className="font-bold">{user.followingCount.toLocaleString()}</span> <span className="text-muted-foreground">following</span></div>
          </div>

          <Tabs defaultValue="posts">
            <TabsList><TabsTrigger value="posts"><Grid className="h-4 w-4 mr-2" />Posts</TabsTrigger><TabsTrigger value="saved"><Bookmark className="h-4 w-4 mr-2" />Saved</TabsTrigger></TabsList>
            <TabsContent value="posts" className="mt-4">
              <div className="grid grid-cols-3 gap-1">
                {userPosts.map(post => post.mediaUrls[0] && <img key={post.id} src={post.mediaUrls[0]} alt="" className="aspect-square object-cover rounded-sm" />)}
                {userPosts.length === 0 && <p className="col-span-3 text-center py-12 text-muted-foreground">No posts yet</p>}
              </div>
            </TabsContent>
            <TabsContent value="saved" className="mt-4"><p className="text-center py-12 text-muted-foreground">Saved posts will appear here</p></TabsContent>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
}
