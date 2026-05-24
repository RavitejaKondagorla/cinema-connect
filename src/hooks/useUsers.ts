import { useState, useCallback } from 'react';
import { User, UserRole, SearchFilters } from '@/types';
import { mockUsers } from '@/data/mockData';

const MOCK_DELAY = 300;

export function useUsers() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUser = useCallback(async (userId: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    
    const user = mockUsers.find(u => u.id === userId);
    setIsLoading(false);
    return user || null;
  }, []);

  const searchUsers = useCallback(async (filters: SearchFilters) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    
    let filtered = [...mockUsers];
    
    if (filters.query) {
      const query = filters.query.toLowerCase();
      filtered = filtered.filter(user => 
        user.displayName.toLowerCase().includes(query) ||
        user.username.toLowerCase().includes(query) ||
        user.bio.toLowerCase().includes(query)
      );
    }
    
    if (filters.role) {
      filtered = filtered.filter(user => user.role === filters.role);
    }
    
    if (filters.location) {
      const location = filters.location.toLowerCase();
      filtered = filtered.filter(user => 
        user.location?.toLowerCase().includes(location)
      );
    }
    
    setUsers(filtered);
    setIsLoading(false);
    return filtered;
  }, []);

  const searchByRole = useCallback(async (role: UserRole) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    
    const filtered = mockUsers.filter(user => user.role === role);
    setUsers(filtered);
    setIsLoading(false);
    return filtered;
  }, []);

  const followUser = useCallback(async (userId: string) => {
    // Mock follow action
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    return { success: true };
  }, []);

  const unfollowUser = useCallback(async (userId: string) => {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    return { success: true };
  }, []);

  const getSuggestedUsers = useCallback(async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    
    // Return random users as suggestions
    const suggestions = mockUsers.slice(0, 4);
    setIsLoading(false);
    return suggestions;
  }, []);

  return {
    users,
    isLoading,
    fetchUser,
    searchUsers,
    searchByRole,
    followUser,
    unfollowUser,
    getSuggestedUsers,
  };
}

export default useUsers;
