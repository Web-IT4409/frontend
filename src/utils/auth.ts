import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  exp: number; // Expiration time in seconds since the epoch
}

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return decoded.exp < currentTime; // Token is expired if `exp` is less than the current time
  } catch (error) {
    console.error('Failed to decode token:', error);
    return true; // Treat invalid tokens as expired
  }
};