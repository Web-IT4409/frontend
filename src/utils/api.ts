import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Use relative path to work with Vite proxy
});

// Add a request interceptor to include the token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Retrieve token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
