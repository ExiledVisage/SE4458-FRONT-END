import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './roomUpdatePage.css';
import { UserContext } from '../context/userContext';

function RoomUpdatePage() {
  const { user } = useContext(UserContext);
  const [rooms, setRooms] = useState([]);
  const [roomDetails, setRoomDetails] = useState({ id: '', type: '', price: '', capacity: '', isAvailable: true });

  useEffect(() => {
    // Fetch existing rooms if the user is an admin
    if (user && user.role === 'Admin') {
      axios.get('http://localhost:5275/hotelBookingAPI/api/rooms/get-all-rooms')
        .then(response => setRooms(response.data))
        .catch(error => console.error('Error fetching rooms:', error));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoomDetails({ ...roomDetails, [name]: value });
  };

  const handleCreateRoom = () => {
    axios.post('http://localhost:5275/hotelBookingAPI/api/rooms/create-room', roomDetails)
      .then(response => {
        setRooms([...rooms, response.data]);
        setRoomDetails({ id: '', type: '', price: '', capacity: '', isAvailable: true });
        alert('Room created successfully!');
      })
      .catch(error => console.error('Error creating room:', error));
  };

  const handleUpdateRoom = (id) => {
    axios.put(`http://localhost:5275/hotelBookingAPI/api/rooms/update-room/${id}`, roomDetails)
      .then(response => {
        setRooms(rooms.map(room => (room.id === id ? response.data : room)));
        setRoomDetails({ id: '', type: '', price: '', capacity: '', isAvailable: true });
        alert('Room updated successfully!');
      })
      .catch(error => console.error('Error updating room:', error));
  };

  return (
    <div className="admin-container">
      <h1>Admin Page</h1>
      {user && user.role === 'Admin' ? (
        <>
          <div className="room-form">
            <h2>Create/Update Room</h2>
            <input
              type="text"
              name="type"
              placeholder="Room Type"
              value={roomDetails.type}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={roomDetails.price}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="capacity"
              placeholder="Capacity"
              value={roomDetails.capacity}
              onChange={handleInputChange}
            />
            <label>
              Available:
              <input
                type="checkbox"
                name="isAvailable"
                checked={roomDetails.isAvailable}
                onChange={(e) => setRoomDetails({ ...roomDetails, isAvailable: e.target.checked })}
              />
            </label>
            <button onClick={handleCreateRoom}>Create Room</button>
            <button onClick={() => handleUpdateRoom(roomDetails.id)}>Update Room</button>
          </div>

          <div className="room-list">
            <h2>Existing Rooms</h2>
            <ul>
              {rooms.map(room => (
                <li key={room.id} onClick={() => setRoomDetails(room)}>
                  {room.type} - ${room.price} - Capacity: {room.capacity} - Available: {room.isAvailable ? 'Yes' : 'No'}
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <p>You do not have permission to access this page.</p>
      )}
    </div>
  );
}

export default RoomUpdatePage;