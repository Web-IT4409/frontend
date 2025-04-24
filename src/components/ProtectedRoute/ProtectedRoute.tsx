import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const token = localStorage.getItem('token'); // Check if the user is logged in

    if (!token) {
        return <Navigate to="/" replace />; // Redirect to login page if not logged in
    }

    return <>{children}</>; // Render the protected content if logged in
};

export default ProtectedRoute;