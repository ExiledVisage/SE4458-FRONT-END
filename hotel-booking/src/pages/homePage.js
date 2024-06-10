import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './homePage.css';
import { UserContext } from '../context/userContext';
import { SearchContext } from '../context/searchContext';

function HomePage() {
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);
  const { searchParams, setSearchParams } = useContext(SearchContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  const handleSearch = () => {
    navigate('/search');
  };

  const handleAdminPage = () => {
    navigate('/room-update');
  };

  return (
    <div className="home-container">
      <h1>Hotel Booking</h1>
      {user ? (
        <>
          <p>Welcome, {user.email}. Your role is {user.role}.</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button onClick={() => navigate('/login')}>Login</button>
      )}
      <input
        type="text"
        name="destination"
        placeholder="Destination"
        value={searchParams.destination}
        onChange={handleInputChange}
      />
      <input
        type="date"
        name="startDate"
        value={searchParams.startDate}
        onChange={handleInputChange}
      />
      <input
        type="date"
        name="endDate"
        value={searchParams.endDate}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="guests"
        placeholder="Guests"
        value={searchParams.guests}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>
      {user && user.role === 'Admin' && (
        <button className="admin" onClick={handleAdminPage}>Admin Page</button>
      )}
    </div>
  );
}

export default HomePage;