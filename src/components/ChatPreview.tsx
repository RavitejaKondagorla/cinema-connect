import { Conversation } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface ChatPreviewProps {
  conversation: Conversation;
  currentUserId: string;
  onClick?: () => void;
}

export function ChatPreview({ conversation, currentUserId, onClick }: ChatPreviewProps) {
  const otherUser = conversation.participants.find(p => p.id !== currentUserId) || conversation.participants[0];

  return (
    <div
      className={cn(
        "flex items-center gap-3 p-4 hover:bg-secondary/50 transition-colors cursor-pointer",
        conversation.unreadCount > 0 && "bg-primary/5"
      )}
      onClick={onClick}
    >
      <div className="relative">
        <Avatar className="h-14 w-14">
          <AvatarImage src={otherUser.avatarUrl} alt={otherUser.displayName} />
          <AvatarFallback>{otherUser.displayName[0]}</AvatarFallback>
        </Avatar>
        {otherUser.isOnline && (
          <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-green-500 ring-2 ring-background" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1">
            <span className={cn(
              "font-medium truncate",
              conversation.unreadCount > 0 && "font-semibold"
            )}>
              {otherUser.displayName}
            </span>
            {otherUser.isVerified && (
              <svg className="h-4 w-4 text-primary shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
            )}
          </div>
          <span className="text-xs text-muted-foreground shrink-0">
            {conversation.lastMessage && formatDistanceToNow(new Date(conversation.lastMessage.createdAt), { addSuffix: false })}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <p className={cn(
            "text-sm truncate",
            conversation.unreadCount > 0 ? "text-foreground font-medium" : "text-muted-foreground"
          )}>
            {conversation.lastMessage?.content || 'Start a conversation'}
          </p>

          {conversation.unreadCount > 0 && (
            <span className="shrink-0 ml-2 h-5 min-w-5 px-1.5 rounded-full gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
              {conversation.unreadCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatPreview;
