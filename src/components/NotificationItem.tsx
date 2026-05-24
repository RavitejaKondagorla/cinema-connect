import { Notification } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { Heart, MessageCircle, UserPlus, AtSign, Mail } from 'lucide-react';

interface NotificationItemProps {
  notification: Notification;
  onClick?: () => void;
}

export function NotificationItem({ notification, onClick }: NotificationItemProps) {
  const getIcon = () => {
    switch (notification.type) {
      case 'like':
        return <Heart className="h-4 w-4 text-red-500 fill-current" />;
      case 'comment':
        return <MessageCircle className="h-4 w-4 text-primary" />;
      case 'follow':
        return <UserPlus className="h-4 w-4 text-green-500" />;
      case 'mention':
        return <AtSign className="h-4 w-4 text-accent" />;
      case 'message':
        return <Mail className="h-4 w-4 text-primary" />;
      default:
        return null;
    }
  };

  const getMessage = () => {
    switch (notification.type) {
      case 'like':
        return 'liked your post';
      case 'comment':
        return `commented: "${notification.message}"`;
      case 'follow':
        return 'started following you';
      case 'mention':
        return 'mentioned you in a post';
      case 'message':
        return `sent you a message: "${notification.message}"`;
      default:
        return '';
    }
  };

  return (
    <div
      className={cn(
        "flex items-start gap-3 p-4 transition-colors cursor-pointer hover:bg-secondary/50",
        !notification.isRead && "bg-primary/5"
      )}
      onClick={onClick}
    >
      <div className="relative">
        <Avatar className="h-12 w-12">
          <AvatarImage src={notification.fromUser.avatarUrl} alt={notification.fromUser.displayName} />
          <AvatarFallback>{notification.fromUser.displayName[0]}</AvatarFallback>
        </Avatar>
        <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-background flex items-center justify-center ring-2 ring-background">
          {getIcon()}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm">
          <span className="font-semibold">{notification.fromUser.displayName}</span>{' '}
          <span className={cn(!notification.isRead && "font-medium")}>{getMessage()}</span>
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
        </p>
      </div>

      {notification.post && (
        <div className="shrink-0 h-12 w-12 rounded-md overflow-hidden bg-muted">
          {notification.post.mediaUrls.length > 0 && (
            <img
              src={notification.post.mediaUrls[0]}
              alt=""
              className="h-full w-full object-cover"
            />
          )}
        </div>
      )}

      {notification.type === 'follow' && (
        <Button size="sm" variant="outline" className="shrink-0">
          Follow back
        </Button>
      )}
    </div>
  );
}

export default NotificationItem;
