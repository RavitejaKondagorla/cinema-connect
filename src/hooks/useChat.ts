import { useState, useCallback } from 'react';
import { Conversation, Message } from '@/types';
import { mockConversations, mockMessages } from '@/data/mockData';

const MOCK_DELAY = 200;

export function useChat() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [isLoading, setIsLoading] = useState(false);

  const fetchConversations = useCallback(async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    setConversations(mockConversations);
    setIsLoading(false);
    return mockConversations;
  }, []);

  const fetchMessages = useCallback(async (conversationId: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    
    const filtered = mockMessages.filter(m => m.conversationId === conversationId);
    setMessages(filtered);
    setIsLoading(false);
    return filtered;
  }, []);

  const sendMessage = useCallback(async (conversationId: string, content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      conversationId,
      senderId: '1',
      sender: mockConversations[0].participants[0],
      content,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Update last message in conversation
    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId) {
        return { ...conv, lastMessage: newMessage, updatedAt: newMessage.createdAt };
      }
      return conv;
    }));
    
    return { success: true, message: newMessage };
  }, []);

  const markAsRead = useCallback(async (conversationId: string) => {
    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId) {
        return { ...conv, unreadCount: 0 };
      }
      return conv;
    }));
    
    setMessages(prev => prev.map(msg => {
      if (msg.conversationId === conversationId) {
        return { ...msg, isRead: true };
      }
      return msg;
    }));
    
    return { success: true };
  }, []);

  const startConversation = useCallback(async (userId: string) => {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    // In real app, create new conversation with user
    return { success: true, conversationId: Date.now().toString() };
  }, []);

  const getTotalUnread = useCallback(() => {
    return conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);
  }, [conversations]);

  return {
    conversations,
    messages,
    isLoading,
    fetchConversations,
    fetchMessages,
    sendMessage,
    markAsRead,
    startConversation,
    getTotalUnread,
  };
}

export default useChat;
