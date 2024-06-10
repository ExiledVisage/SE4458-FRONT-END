import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './searchResultsPage.css';

function SearchResultsPage() {
  const location = useLocation();
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get('/api/hotels', { params: location.state.searchParams });
        setHotels(response.data);
      } catch (error) {
        console.error('Error fetching hotels', error);
      }
    };
    fetchHotels();
  }, [location.state.searchParams]);

  return (
    <div className="results-container">
      <h1>Search Results</h1>
      <ul className="hotel-list">
        {hotels.map(hotel => (
          <li key={hotel.id} className="hotel-item">
            <h2>{hotel.name}</h2>
            <p>{hotel.description}</p>
            <button>View Details</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchResultsPage;