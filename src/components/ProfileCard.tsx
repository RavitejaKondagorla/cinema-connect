import { User } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { UserCheck, UserPlus } from 'lucide-react';
import { useState } from 'react';

interface ProfileCardProps {
  user: User;
  compact?: boolean;
  showFollowButton?: boolean;
  onClick?: () => void;
}

export function ProfileCard({ user, compact = false, showFollowButton = true, onClick }: ProfileCardProps) {
  const [isFollowing, setIsFollowing] = useState(false);

  const roleColors: Record<string, string> = {
    director: 'bg-primary/10 text-primary border-primary/20',
    actor: 'bg-accent/10 text-accent border-accent/20',
    producer: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    singer: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
    photographer: 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20',
    videographer: 'bg-violet-500/10 text-violet-600 border-violet-500/20',
    writer: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    composer: 'bg-rose-500/10 text-rose-600 border-rose-500/20',
    editor: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20',
    other: 'bg-gray-500/10 text-gray-600 border-gray-500/20',
  };

  if (compact) {
    return (
      <div 
        className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
        onClick={onClick}
      >
        <div className="relative">
          <Avatar className="h-12 w-12 ring-2 ring-primary/20">
            <AvatarImage src={user.avatarUrl} alt={user.displayName} />
            <AvatarFallback>{user.displayName[0]}</AvatarFallback>
          </Avatar>
          {user.isOnline && (
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-background" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-sm truncate">{user.displayName}</span>
            {user.isVerified && (
              <svg className="h-4 w-4 text-primary shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
            )}
          </div>
          <p className="text-xs text-muted-foreground truncate">@{user.username}</p>
        </div>
        {showFollowButton && (
          <Button
            size="sm"
            variant={isFollowing ? "outline" : "default"}
            className={cn("shrink-0", isFollowing && "text-primary")}
            onClick={(e) => {
              e.stopPropagation();
              setIsFollowing(!isFollowing);
            }}
          >
            {isFollowing ? <UserCheck className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
          </Button>
        )}
      </div>
    );
  }

  return (
    <div 
      className="bg-card rounded-xl shadow-card p-4 hover:shadow-soft transition-shadow cursor-pointer animate-fade-in"
      onClick={onClick}
    >
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-3">
          <Avatar className="h-20 w-20 ring-4 ring-primary/20">
            <AvatarImage src={user.avatarUrl} alt={user.displayName} />
            <AvatarFallback className="text-2xl">{user.displayName[0]}</AvatarFallback>
          </Avatar>
          {user.isOnline && (
            <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-green-500 ring-2 ring-background" />
          )}
        </div>

        <div className="flex items-center gap-1 mb-1">
          <h3 className="font-semibold">{user.displayName}</h3>
          {user.isVerified && (
            <svg className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
            </svg>
          )}
        </div>

        <p className="text-sm text-muted-foreground mb-2">@{user.username}</p>

        <Badge variant="outline" className={cn("mb-3 capitalize", roleColors[user.role])}>
          {user.role}
        </Badge>

        {user.location && (
          <p className="text-xs text-muted-foreground mb-3">{user.location}</p>
        )}

        <div className="flex gap-4 text-sm mb-4">
          <div className="text-center">
            <p className="font-bold">{user.followersCount.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Followers</p>
          </div>
          <div className="text-center">
            <p className="font-bold">{user.followingCount.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Following</p>
          </div>
        </div>

        {showFollowButton && (
          <Button
            className="w-full"
            variant={isFollowing ? "outline" : "default"}
            onClick={(e) => {
              e.stopPropagation();
              setIsFollowing(!isFollowing);
            }}
          >
            {isFollowing ? (
              <>
                <UserCheck className="h-4 w-4 mr-2" />
                Following
              </>
            ) : (
              <>
                <UserPlus className="h-4 w-4 mr-2" />
                Follow
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}

export default ProfileCard;
