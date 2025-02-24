import React from 'react';
import { useNavigate } from 'react-router';
import LoginForm from '@components/LoginForm/LoginForm';
import './Login.scss';

const Login: React.FC = () => {
    const navigate = useNavigate();

    const handleSubmit = async (data: any) => {
        try {
            console.log('Login attempt:', data);
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
                        src="/src/assets/facebook-logo.svg"
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