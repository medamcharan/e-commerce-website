import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css'; // Ensure you have a CSS file for styling

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.find(user => user.email === email);

    if (userExists) {
      setError('User with this email already exists');
      return;
    }

    const newUser = { email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Set authentication status and redirect to the login page
    localStorage.setItem('authenticated', 'false');
    navigate('/login');
  };

  return (
    <div className="register-page">
      <div className="circle">
      <div >
         
        
      </div>
      <form onSubmit={handleRegister} className="register-form">
        <h2>𝚁𝚎𝚐𝚒𝚜𝚝𝚎𝚛</h2>
        {error && <p className="error">{error}</p>}
        <div className="form-group">
          <label htmlFor="email"><b>𝙴𝚖𝚊𝚒𝚕:</b></label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password"><b>𝙿𝚊𝚜𝚜𝚠𝚘𝚛𝚍:</b> </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">𝚂𝚞𝚋𝚖𝚒𝚝 »»»</button>
        <br></br>
        <br></br>
        <br></br>
        <p>Already have an account? <Link style={{ color: 'black' }}  to="/login">Ｌｏｇ ｉｎ</Link></p>
      </form>
      </div>
    </div>
  );
};

export default Register;
