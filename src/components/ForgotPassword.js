import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './ForgotPassword.css'; // Ensure you have a CSS file for styling

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const emailInputRef = useRef(null);
  const navigate = useNavigate();

  const handleResetRequest = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.find(user => user.email === email);

    if (!userExists) {
      setError('The email address you entered is not registered. Please try again.');
      setMessage('');
      emailInputRef.current.focus(); // Focus on email input
      return;
    }

    // Logic to handle password reset request
    // For example, send an email or display a success message
    setMessage('If this email is registered, you will receive a password reset link shortly.');
    setError('');
    setTimeout(() => navigate('/login'), 3000); // Redirect to login page after 3 seconds
  };

  return (
    <div className="forgot-password-page">
      <form onSubmit={handleResetRequest} className="forgot-password-form">
        <h2>Forgot Password</h2>
        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            ref={emailInputRef}
          />
        </div>
        <button type="submit">Reset Password</button>
        <p>Remembered your password? <Link to="/login">Log in</Link></p>
      </form>
    </div>
  );
};

export default ForgotPassword;
