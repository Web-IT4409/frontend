import React from 'react';
import { useNavigate } from 'react-router';
import SignupForm from '@components/SignupForm/SignupForm';
import { signUp } from '@/services/authService';
import './Signup.scss';

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data: any) => {
    try {
      const { firstName, lastName, emailOrPhone, password } = data;

      const payload = {
        firstName,
        lastName,
        username: emailOrPhone, // Map emailOrPhone to username
        password,
      };

      const response = await signUp(payload);
      console.log('Sign Up Successful:', response.data);
      navigate('/'); // Redirect to login page
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