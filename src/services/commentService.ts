import api from '@/utils/api';

export const createComment = async (postId: number, content: string) => {
  const response = await api.post(`/comments/${postId}`, { content });
  return response.data;
};
