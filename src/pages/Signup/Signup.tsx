import React from 'react';
import { useNavigate } from 'react-router';
import SignupForm from '@components/SignupForm/SignupForm';
import './Signup.scss';

const Signup: React.FC = () => {
    const navigate = useNavigate();

    const handleSubmit = async (data: any) => {
        try {
            console.log('Create attempt:', data);
        } catch (error) {
            console.error('Create failed:', error);
        }
    };

    const handleHavingAccount = () => {
        navigate('/');
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
                </div>

                <div className="login-right">
                    <SignupForm
                        onSubmit={handleSubmit}
                        onHavingAccount={handleHavingAccount}
                    />
                </div>
            </div>
        </div>
    );
};

export default Signup; 