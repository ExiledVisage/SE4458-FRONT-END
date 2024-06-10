import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './searchResultsPage.css';
import { SearchContext } from '../context/searchContext';
import { UserContext } from '../context/userContext';

function SearchResultsPage() {
  const navigate = useNavigate();
  const { searchParams } = useContext(SearchContext);
  const { user } = useContext(UserContext);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.post('http://localhost:5275/hotelBookingAPI/api/rooms/search-rooms', searchParams);
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, [searchParams]);

  const handleBookRoom = (room) => {
    navigate('/booking', { state: { room, searchParams } });
  };

  const getDiscountedPrice = (price) => {
    return user ? (price * 0.9).toFixed(2) : price;
  };

  return (
    <div className="search-results-container">
      <h2>Available Rooms</h2>
      {rooms.length > 0 ? (
        rooms.map((room) => (
          <div key={room.id} className="room-card">
            <h3>{room.type}</h3>
            <p>Price: ${getDiscountedPrice(room.price)}</p>
            <p>Capacity: {room.capacity}</p>
            <button onClick={() => handleBookRoom(room)}>Book Now</button>
          </div>
        ))
      ) : (
        <p>No rooms available for the selected criteria.</p>
      )}
    </div>
  );
}

export default SearchResultsPage;