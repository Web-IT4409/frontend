import React from 'react';
import { Navigate } from 'react-router-dom';
import { isTokenExpired } from '@/utils/auth';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const token = localStorage.getItem('token');

    if (!token || isTokenExpired(token)) {
        localStorage.removeItem('token'); // Remove expired or invalid token
        return <Navigate to="/" replace />; // Redirect to login page
    }

    return <>{children}</>; // Render the protected content if token is valid
};

export default ProtectedRoute;