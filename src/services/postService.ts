import api from '@/utils/api';

export const fetchPosts = async () => {
  const response = await api.get('/posts/all');
  return response.data.data; // Return the list of posts from the "data" field
};

export const fetchUserPosts = async (userId: number) => {
  const response = await api.get(`/posts/user/${userId}`);
  return response.data.data; // Return the list of posts from the "data" field
};

export const fetchCommentsByPostId = async (postId: number) => {
  const response = await api.get(`/comments/${postId}`);
  return response.data.data; // Return the list of comments
};

export const createPost = async (data: {
  content: string;
  visibility: string;
  mediaUrl: string[];
  location?: string | null;
  emotion?: string | null;
}) => {
  const response = await api.post('/posts', data);
  return response.data; // Return the created post data
};
