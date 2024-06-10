import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './hotelDetailPage.css';

function HotelDetailPage() {
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await axios.get(`http://localhost:5275/hotelBookingAPI/api/hotels/get-hotel/${hotelId}`);
        setHotel(response.data);
      } catch (error) {
        console.error('Error fetching hotel details', error);
      }
    };
    fetchHotel();
  }, [hotelId]);

  if (!hotel) return <div>Loading...</div>;

  return (
    <div className="hotel-detail-container">
      <h1>{hotel.name}</h1>
      <p>{hotel.description}</p>
      <ul className="room-list">
        {hotel.rooms.map(room => (
          <li key={room.id} className="room-item">
            <h3>{room.name}</h3>
            <p>{room.description}</p>
            <button>Book Now</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HotelDetailPage;