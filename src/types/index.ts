export type UserRole = 
  | 'director' 
  | 'actor' 
  | 'producer' 
  | 'singer' 
  | 'photographer' 
  | 'videographer' 
  | 'writer' 
  | 'composer' 
  | 'editor' 
  | 'other';

export interface User {
  id: string;
  email: string;
  displayName: string;
  username: string;
  bio: string;
  role: UserRole;
  avatarUrl: string;
  coverUrl?: string;
  location?: string;
  portfolioUrl?: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  isVerified: boolean;
  isPrivate: boolean;
  isOnline: boolean;
  createdAt: string;
}

export interface Post {
  id: string;
  userId: string;
  user: User;
  content: string;
  mediaUrls: string[];
  mediaType: 'image' | 'video';
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  isLiked: boolean;
  isSaved: boolean;
  visibility: 'public' | 'followers' | 'private';
  tags: string[];
  createdAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  user: User;
  content: string;
  likesCount: number;
  isLiked: boolean;
  createdAt: string;
  replies?: Comment[];
}

export interface Conversation {
  id: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  updatedAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  sender: User;
  content: string;
  mediaUrl?: string;
  isRead: boolean;
  createdAt: string;
}

export interface Notification {
  id: string;
  type: 'follow' | 'like' | 'comment' | 'message' | 'mention';
  fromUser: User;
  post?: Post;
  message?: string;
  isRead: boolean;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface SearchFilters {
  query: string;
  role?: UserRole;
  location?: string;
}
