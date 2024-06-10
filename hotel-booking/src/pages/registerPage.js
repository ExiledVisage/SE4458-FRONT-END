import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './registerPage.css';

function RegisterPage() {
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'NormalUser'
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleRegister = async () => {
    if (userDetails.password !== userDetails.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      await axios.post('http://localhost:5275/hotelBookingAPI/api/users/register', {
        Username: userDetails.username,
        Email: userDetails.email,
        Password: userDetails.password,
        Role: userDetails.role,
      });
      alert('Registration successful. Please log in.');
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <input type="text" name="username" placeholder="Username" onChange={handleInputChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleInputChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
      <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleInputChange} />
      <select name="role" value={userDetails.role} onChange={handleInputChange}>
        <option value="NormalUser">Normal User</option>
        <option value="Admin">Admin</option>
      </select>
      <button onClick={handleRegister}>Register</button>
      <p onClick={() => navigate('/login')}>Already have an account? Login here</p>
    </div>
  );
}

export default RegisterPage;