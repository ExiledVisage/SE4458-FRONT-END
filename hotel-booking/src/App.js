import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage';
import SearchResultsPage from './pages/searchResultPage';
import HotelDetailPage from './pages/hotelDetailPage';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import { UserProvider } from './context/userContext';
import { SearchProvider } from './context/searchContext';
import RoomUpdatePage from './pages/roomUpdatePage';
import BookingPage from './pages/bookingPage';

function App() {
  return (
  <UserProvider>
    <SearchProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/hotel/:hotelId" element={<HotelDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/room-update" element={<RoomUpdatePage/>} />
          <Route path="/booking" element={<BookingPage/>} />
        </Routes>
      </Router>
    </SearchProvider>
  </UserProvider>
  );
}

export default App;