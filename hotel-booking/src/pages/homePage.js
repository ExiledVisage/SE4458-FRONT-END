import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/userContext';
import jwtDecode from 'jwt-decode';
import './homePage.css';

function HomePage() {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token && !user) {
      const decodedToken = jwtDecode(token);
      setUser({ email: decodedToken.sub, role: decodedToken.role });
    }
  }, [user, setUser]);

  return (
    <div className="home-container">
      <h1>Hotel Booking</h1>
      {user ? (
        <p>Welcome, {user.email}. Your role is {user.role}.</p>
      ) : (
        <p>Please log in</p>
      )}
      {/* Your search form and other content */}
    </div>
  );
}

export default HomePage;