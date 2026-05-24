import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from 'lucide-react';
import { Post } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface PostCardProps {
  post: Post;
  onLike?: (postId: string) => void;
  onSave?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
}

export function PostCard({ post, onLike, onSave, onComment, onShare }: PostCardProps) {
  const roleColors: Record<string, string> = {
    director: 'bg-primary/10 text-primary',
    actor: 'bg-accent/10 text-accent',
    producer: 'bg-emerald-500/10 text-emerald-600',
    singer: 'bg-orange-500/10 text-orange-600',
    photographer: 'bg-cyan-500/10 text-cyan-600',
    videographer: 'bg-violet-500/10 text-violet-600',
  };

  return (
    <article className="bg-card rounded-xl shadow-card overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 ring-2 ring-primary/20">
            <AvatarImage src={post.user.avatarUrl} alt={post.user.displayName} />
            <AvatarFallback>{post.user.displayName[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm">{post.user.displayName}</span>
              {post.user.isVerified && (
                <svg className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                </svg>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className={cn("text-xs py-0", roleColors[post.user.role])}>
                {post.user.role}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
              </span>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {/* Media */}
      {post.mediaUrls.length > 0 && (
        <div className="relative aspect-square bg-muted">
          <img
            src={post.mediaUrls[0]}
            alt="Post media"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className={cn("h-9 w-9", post.isLiked && "text-red-500")}
              onClick={() => onLike?.(post.id)}
            >
              <Heart className={cn("h-5 w-5", post.isLiked && "fill-current")} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              onClick={() => onComment?.(post.id)}
            >
              <MessageCircle className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              onClick={() => onShare?.(post.id)}
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={cn("h-9 w-9", post.isSaved && "text-primary")}
            onClick={() => onSave?.(post.id)}
          >
            <Bookmark className={cn("h-5 w-5", post.isSaved && "fill-current")} />
          </Button>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-2 text-sm font-medium">
          <span>{post.likesCount.toLocaleString()} likes</span>
          <span>{post.commentsCount.toLocaleString()} comments</span>
        </div>

        {/* Content */}
        <p className="text-sm">
          <span className="font-semibold mr-2">{post.user.username}</span>
          {post.content}
        </p>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {post.tags.map((tag) => (
              <span key={tag} className="text-primary text-sm">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export default PostCard;
