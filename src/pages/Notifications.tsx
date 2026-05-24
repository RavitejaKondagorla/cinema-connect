import { AppLayout } from '@/components/AppLayout';
import { NotificationItem } from '@/components/NotificationItem';
import { Button } from '@/components/ui/button';
import { useNotifications } from '@/hooks/useNotifications';
import { Check } from 'lucide-react';

export default function Notifications() {
  const { notifications, markAllAsRead } = useNotifications();

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        <header className="flex items-center justify-between p-4 border-b sticky top-0 bg-background/95 backdrop-blur-sm z-10">
          <h1 className="text-xl font-display font-bold">Notifications</h1>
          <Button variant="ghost" size="sm" onClick={markAllAsRead}><Check className="h-4 w-4 mr-2" />Mark all read</Button>
        </header>
        <div className="divide-y">{notifications.map(n => <NotificationItem key={n.id} notification={n} />)}</div>
      </div>
    </AppLayout>
  );
}
