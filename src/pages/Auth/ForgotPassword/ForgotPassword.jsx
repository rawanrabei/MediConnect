import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../../components/common/Input/Input';
import Button from '../../../components/common/Button/Button';
import { authContainer, authLink, authPage } from '../../../constants/uiClasses';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Resetpassword for:', email);
  };

  return (
    <div className={authPage}>
      <div className={authContainer}>
        <h1>Forgot Password</h1>
        <p>Enter your email to reset your password</p>
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <Button type="submit" variant="primary" size="large">
            Send Reset Link
          </Button>
        </form>
        <p className={authLink}>
          Remember your password? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
