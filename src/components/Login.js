// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Login.css'; // Ensure you have a CSS file for styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
      localStorage.setItem('authenticated', 'true');
      navigate('/');
    } else {
      setError('Invalid email or password');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-page">
        <div className="circle">
        <div >
      <form onSubmit={handleLogin} className="login-form">
        <h2>𝙻𝚘𝚐𝚒𝚗</h2>
        {error && <p className="error">{error}</p>}
        <div className="form-group">
          <label htmlFor="email"><b> 𝙴𝚖𝚊𝚒𝚕:</b></label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group password-group">
          <label htmlFor="password"><b> 𝙿𝚊𝚜𝚜𝚠𝚘𝚛𝚍:</b></label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span className="password-toggle" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <button type="submit">Login</button>
        <div className="forgot-password">
        <Link to="/register">Ｒｅｇｉｓｔｅｒ</Link>
        <br></br>
          <Link to="/forgot-password">Ｆｏｒｇｏｔ Ｐａｓｓｗｏｒｄ?</Link>
        
        </div>
      </form>
      </div>
      </div>
    </div>
  );
};

export default Login;
