import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppLayout } from '@/components/AppLayout';
import { ChatPreview } from '@/components/ChatPreview';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useChat } from '@/hooks/useChat';
import { currentUser } from '@/data/mockData';
import { ArrowLeft, Send, Phone, Video, MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Chat() {
  const { conversationId } = useParams();
  const { conversations, messages, sendMessage } = useChat();
  const [newMessage, setNewMessage] = useState('');

  const activeConversation = conversationId ? conversations.find(c => c.id === conversationId) : null;
  const otherUser = activeConversation?.participants.find(p => p.id !== currentUser.id);
  const conversationMessages = messages.filter(m => m.conversationId === conversationId);

  const handleSend = () => {
    if (!newMessage.trim() || !conversationId) return;
    sendMessage(conversationId, newMessage);
    setNewMessage('');
  };

  if (!conversationId) {
    return (
      <AppLayout>
        <div className="max-w-2xl mx-auto h-full">
          <header className="p-4 border-b"><h1 className="text-xl font-display font-bold">Messages</h1></header>
          <div className="divide-y">{conversations.map(c => <ChatPreview key={c.id} conversation={c} currentUserId={currentUser.id} onClick={() => window.location.href = `/chat/${c.id}`} />)}</div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout showNav={false}>
      <div className="flex flex-col h-screen max-w-2xl mx-auto">
        <header className="flex items-center gap-3 p-4 border-b bg-card/80 backdrop-blur-sm">
          <Button variant="ghost" size="icon" onClick={() => window.location.href = '/chat'}><ArrowLeft className="h-5 w-5" /></Button>
          <Avatar className="h-10 w-10"><AvatarImage src={otherUser?.avatarUrl} /><AvatarFallback>{otherUser?.displayName[0]}</AvatarFallback></Avatar>
          <div className="flex-1"><p className="font-semibold">{otherUser?.displayName}</p><p className="text-xs text-green-500">Online</p></div>
          <Button variant="ghost" size="icon"><Phone className="h-5 w-5" /></Button>
          <Button variant="ghost" size="icon"><Video className="h-5 w-5" /></Button>
          <Button variant="ghost" size="icon"><MoreVertical className="h-5 w-5" /></Button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {conversationMessages.map(msg => (
            <div key={msg.id} className={cn("flex", msg.senderId === currentUser.id && "justify-end")}>
              <div className={cn("max-w-[75%] rounded-2xl px-4 py-2", msg.senderId === currentUser.id ? "gradient-primary text-primary-foreground rounded-br-sm" : "bg-secondary rounded-bl-sm")}>
                <p className="text-sm">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t bg-card/80 backdrop-blur-sm">
          <div className="flex gap-2">
            <Input placeholder="Type a message..." value={newMessage} onChange={e => setNewMessage(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} className="flex-1" />
            <Button onClick={handleSend} className="gradient-primary"><Send className="h-5 w-5" /></Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
