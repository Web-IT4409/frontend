import React from 'react';
import { useNavigate } from 'react-router';
import SignupForm from '@components/SignupForm/SignupForm';
import { signUp } from '@/services/authService';
import './Signup.scss';

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data: any) => {
    console.log('Form submitted:', data);
    try {
      const { firstName, lastName, username, password } = data;

      const response = await signUp({firstName, lastName, username, password});
      console.log('Sign Up Successful:', response.data);
      navigate('/');
    } catch (error) {
      console.error('Sign Up Failed:', error);
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