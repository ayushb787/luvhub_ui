// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import LoginPage from './components/UserAuth/LoginPage';
import SignupPage from './components/UserAuth/SignupPage';
import LandingPage from './components/HomePage/LandingPage';
import UserDashboard from './components/UserDashboard/UserDashboard';
import UserNavbar from './components/UserDashboard/UserNavbar';
import AddCrushPage from './components/UserDashboard/AddCrush';
function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/add-crush" element={<AddCrushPage />} />
      </Routes>
    </Router>

  );
}

export default App;
