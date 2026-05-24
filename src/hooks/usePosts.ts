import { useState, useCallback } from 'react';
import { Post } from '@/types';
import { mockPosts } from '@/data/mockData';

const MOCK_DELAY = 300;

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = useCallback(async (userId?: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    
    if (userId) {
      const filtered = mockPosts.filter(post => post.userId === userId);
      setPosts(filtered);
    } else {
      setPosts(mockPosts);
    }
    
    setIsLoading(false);
    return posts;
  }, [posts]);

  const fetchFeed = useCallback(async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    setPosts(mockPosts);
    setIsLoading(false);
    return mockPosts;
  }, []);

  const createPost = useCallback(async (data: {
    content: string;
    mediaUrls: string[];
    mediaType: 'image' | 'video';
    visibility: 'public' | 'followers' | 'private';
    tags: string[];
  }) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    
    const newPost: Post = {
      id: Date.now().toString(),
      userId: '1',
      user: mockPosts[0].user,
      content: data.content,
      mediaUrls: data.mediaUrls,
      mediaType: data.mediaType,
      likesCount: 0,
      commentsCount: 0,
      sharesCount: 0,
      isLiked: false,
      isSaved: false,
      visibility: data.visibility,
      tags: data.tags,
      createdAt: new Date().toISOString(),
    };
    
    setPosts(prev => [newPost, ...prev]);
    setIsLoading(false);
    return { success: true, post: newPost };
  }, []);

  const likePost = useCallback(async (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likesCount: post.isLiked ? post.likesCount - 1 : post.likesCount + 1,
        };
      }
      return post;
    }));
    return { success: true };
  }, []);

  const savePost = useCallback(async (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return { ...post, isSaved: !post.isSaved };
      }
      return post;
    }));
    return { success: true };
  }, []);

  const deletePost = useCallback(async (postId: string) => {
    setPosts(prev => prev.filter(post => post.id !== postId));
    return { success: true };
  }, []);

  return {
    posts,
    isLoading,
    fetchPosts,
    fetchFeed,
    createPost,
    likePost,
    savePost,
    deletePost,
  };
}

export default usePosts;
