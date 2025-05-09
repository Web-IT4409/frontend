import api from '@/utils/api';

export const fetchPosts = async () => {
  const response = await api.get('/posts/all'); 
  return response.data.data; // Return the list of posts from the "data" field
};

export const fetchCommentsByPostId = async (postId: number) => {
    const response = await api.get(`/comments/${postId}`);
    return response.data.data; // Return the list of comments
  };