import { useState, useCallback } from 'react';
import { Notification } from '@/types';
import { mockNotifications } from '@/data/mockData';

const MOCK_DELAY = 200;

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNotifications = useCallback(async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    setNotifications(mockNotifications);
    setIsLoading(false);
    return mockNotifications;
  }, []);

  const markAsRead = useCallback(async (notificationId: string) => {
    setNotifications(prev => prev.map(notif => {
      if (notif.id === notificationId) {
        return { ...notif, isRead: true };
      }
      return notif;
    }));
    return { success: true };
  }, []);

  const markAllAsRead = useCallback(async () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, isRead: true })));
    return { success: true };
  }, []);

  const deleteNotification = useCallback(async (notificationId: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
    return { success: true };
  }, []);

  const getUnreadCount = useCallback(() => {
    return notifications.filter(n => !n.isRead).length;
  }, [notifications]);

  return {
    notifications,
    isLoading,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    getUnreadCount,
  };
}

export default useNotifications;
