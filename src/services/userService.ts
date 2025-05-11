import api from '@/utils/api';
import { User } from '@/types/User';

export const fetchUserDetails = async () => {
  const response = await api.get('/users/detail');
  return response.data;
};

export const fetchAllUsers = async (): Promise<User[]> => {
  const response = await api.post('/users/all', {});
  return response.data;
};

export const fetchFriends = async (): Promise<User[]> => {
  const response = await api.post('/users/all', { is_friend: true });
  return response.data;
};

export const fetchFriendSuggestions = async (): Promise<User[]> => {
  const response = await api.post('/users/all', { is_friend: false });
  return response.data;
};

export const updateUserAvatar = async (avatarUrl: string): Promise<User> => {
  const response = await api.post('/users/update-avatar', { avatarUrl });
  return response.data;
};
