import api from '@/utils/api';

// Sign Up API
export const signUp = (data: { firstName: string; lastName: string; username: string; password: string }) => {
  return api.post('/users/register', data);
};

// Login API
export const login = (data: { username: string; password: string }) => {
  return api.post('/users/login', data);
};

// Logout API
export const logout = () => {
  return api.post('/users/logout');
};