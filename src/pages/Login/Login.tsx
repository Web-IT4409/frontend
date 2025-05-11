import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import LoginForm from '@components/LoginForm/LoginForm';
import { login } from '@/services/authService';
import { isTokenExpired } from '@/utils/auth';
import './Login.scss';

const Login: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && !isTokenExpired(token)) {
            navigate('/home'); // Redirect to home page if token is valid
        } else {
            localStorage.removeItem('token'); // Remove expired or invalid token
        }
    }, [navigate]);

    const handleSubmit = async (data: {username: string, password: string}) => {
        try {
            const response = await login(data);
            console.log('Login Successful:', response.data);
            localStorage.setItem('token', response.data.token); // Save token to localStorage
            navigate('/home'); // Redirect to home page
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleCreateAccount = () => {
        navigate('/signup');
    };

    return (
        <div className="login-container">
            <div className="login-content">
                <div className="login-left">
                    <img
                        src="/src/assets/cat.svg"
                        alt="Facebook"
                        className="facebook-logo"
                    />
                    <h2>Facebook helps you connect and share with the people in your life.</h2>
                </div>

                <div className="login-right">
                    <LoginForm
                        onSubmit={handleSubmit}
                        onCreateAccount={handleCreateAccount}
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;