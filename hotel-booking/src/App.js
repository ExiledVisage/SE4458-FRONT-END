import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage';
import SearchResultsPage from './pages/searchResultsPage';
import HotelDetailPage from './pages/hotelDetailPage';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import { UserProvider } from './context/userContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/hotel/:hotelId" element={<HotelDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;