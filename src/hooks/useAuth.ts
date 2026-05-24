import { useState, useCallback } from 'react';
import { User, UserRole, AuthState } from '@/types';
import { currentUser } from '@/data/mockData';

// Mock auth state - replace with real API calls
const MOCK_DELAY = 500;

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
  });

  const login = useCallback(async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    
    // Mock successful login
    setAuthState({
      user: currentUser,
      isAuthenticated: true,
      isLoading: false,
    });
    
    return { success: true, user: currentUser };
  }, []);

  const loginWithGoogle = useCallback(async () => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    
    // Mock Google login
    setAuthState({
      user: currentUser,
      isAuthenticated: true,
      isLoading: false,
    });
    
    return { success: true, user: currentUser };
  }, []);

  const loginWithPhone = useCallback(async (phone: string, otp: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    
    setAuthState({
      user: currentUser,
      isAuthenticated: true,
      isLoading: false,
    });
    
    return { success: true, user: currentUser };
  }, []);

  const sendOtp = useCallback(async (phone: string) => {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    return { success: true, message: 'OTP sent successfully' };
  }, []);

  const register = useCallback(async (data: {
    email: string;
    password: string;
    displayName: string;
    username: string;
    role: UserRole;
  }) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    
    const newUser: User = {
      id: Date.now().toString(),
      email: data.email,
      displayName: data.displayName,
      username: data.username,
      bio: '',
      role: data.role,
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
      followersCount: 0,
      followingCount: 0,
      postsCount: 0,
      isVerified: false,
      isPrivate: false,
      isOnline: true,
      createdAt: new Date().toISOString(),
    };
    
    setAuthState({
      user: newUser,
      isAuthenticated: true,
      isLoading: false,
    });
    
    return { success: true, user: newUser };
  }, []);

  const logout = useCallback(async () => {
    setAuthState({ user: null, isAuthenticated: false, isLoading: false });
    return { success: true };
  }, []);

  const updateProfile = useCallback(async (updates: Partial<User>) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    
    if (authState.user) {
      const updatedUser = { ...authState.user, ...updates };
      setAuthState({
        user: updatedUser,
        isAuthenticated: true,
        isLoading: false,
      });
      return { success: true, user: updatedUser };
    }
    
    return { success: false, error: 'Not authenticated' };
  }, [authState.user]);

  return {
    ...authState,
    login,
    loginWithGoogle,
    loginWithPhone,
    sendOtp,
    register,
    logout,
    updateProfile,
  };
}

export default useAuth;
