import api from '@/utils/api';

export const fetchUserDetails = async () => {
  const response = await api.get('/users/detail');
  return response.data; // Return the user details
};