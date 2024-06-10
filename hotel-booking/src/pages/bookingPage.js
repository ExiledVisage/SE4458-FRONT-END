import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/userContext';
import './bookingPage.css';

function BookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { room, searchParams } = location.state;
  const [bookingDetails] = useState({
    userId: user.id,
    roomId: room.id,
    startDate: searchParams.startDate,
    endDate: searchParams.endDate,
  });

  const handleBooking = async () => {
    try {
      await axios.post('http://localhost:5275/hotelBookingAPI/api/bookings/create-booking', bookingDetails);
      alert('Booking created successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Failed to create booking.');
    }
  };

  return (
    <div className="booking-container">
      <h2>Confirm Booking</h2>
      <p>Room Type: {room.type}</p>
      <p>Price: ${room.price}</p>
      <p>Start Date: {bookingDetails.startDate}</p>
      <p>End Date: {bookingDetails.endDate}</p>
      <button onClick={handleBooking}>Confirm Booking</button>
    </div>
  );
}

export default BookingPage;