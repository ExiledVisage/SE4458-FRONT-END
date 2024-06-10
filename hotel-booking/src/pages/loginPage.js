import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import './loginPage.css';
import { UserContext } from '../context/userContext';

function LoginPage() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = async () => {
    console.warn("hiBeforreconstTryFunction")
    try {
      const response = await axios.post('http://localhost:5275/hotelBookingAPI/api/users/login', {
        Email: credentials.email,
        Password: credentials.password,
      });
      console.log("hiBeforreconstToken")
      const token = response.data.token;
      localStorage.setItem('jwtToken', token);
      const decodedToken = jwtDecode(token);
      setUser({ email: decodedToken.sub, role: decodedToken.role });
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <input type="email" name="email" placeholder="Email" onChange={handleInputChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
      <button onClick={handleLogin}>Login</button>
      <p onClick={() => navigate('/register')}>Don't have an account? Register here</p>
    </div>
  );
}

export default LoginPage;