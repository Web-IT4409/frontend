import React from 'react';
import { useNavigate } from 'react-router';
import FogotForm from '@components/SignupForm/FogotForm';
import './Fogot.scss';

const Fogot: React.FC = () => {
    const navigate = useNavigate();

    const handleSubmit = () => {
        try {
            navigate('/');
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
                        src="/src/assets/cat.svg"
                        alt="konnekt"
                        className="konnekt-logo"
                    />
                </div>
                <div className="login-right">
                    <FogotForm
                        sendPinCode={handleSubmit}
                        onHavingAccount={handleHavingAccount}
                    />
                </div>
            </div>
        </div>
    );
};

export default Fogot; 