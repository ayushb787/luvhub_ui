import React, { useState, useEffect } from 'react';
import './LoginPage.css';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ reg: '', password: '' });
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({ name: '', reg: '', gender: '' });

  useEffect(() => {
    console.log(userData);
    localStorage.setItem('name', userData.name);
    localStorage.setItem('reg', userData.reg);
    localStorage.setItem('gender', userData.gender);
    if (userData.name && userData.reg && userData.gender) {
      navigate('/user-dashboard', { state: { userData } });
    }
  }, [userData, navigate]);

  const Loader = () => {
    return (
      <div className="loader-overlay">
        <div className="loader-spinner"></div>
      </div>
    );
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!loginData.reg || !loginData.password) {
      setError('Please enter both username and password.');
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post('/login/', loginData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      if (response.status === 200) {
        setUserData({
          name: response.data.name,
          reg: response.data.reg,
          gender: response.data.gender,
        });
        console.log('Login successful');

      } else {
        setError(response.data.message || 'Invalid credentials. Please try again.');
        setOpenDialog(true);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError(error.response?.data?.message || 'An error occurred during login. Please try again.');
      setOpenDialog(true);
    } finally {
      setLoading(false);
    }
  };
  const spanElements = Array.from({ length: 50 }, (_, index) => (
    <span key={index} style={{ '--i': index }}></span>
  ));

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setLoginData({
      reg: '',
      password: '',
    });
  };

  return (
    <div className='login-outer-container'>
      <div className="container">
        {loading && <Loader />}
        <div className="login-box">
          <h2>Login</h2>
          <form onSubmit={handleLoginSubmit}>
            <div className="input-box">
              <input
                type="text"
                value={loginData.reg}
                onChange={(e) => setLoginData({ ...loginData, reg: e.target.value })}
                required
              />
              <label>Reg No</label>
            </div>
            <div className="input-box">
              <input
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                required
              />
              <label>Password</label>
            </div>
            <div className="forgot-pass">
              <a href="#">Forgot your password?</a>
            </div>
            <button type="submit" className="btn">
              Login
            </button>
            <div className="signup-link">
              <a href="/sign-up">Signup</a>
            </div>
          </form>
        </div>
        {spanElements}
        <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
          <DialogTitle style={{ color: 'red' }}>Error</DialogTitle>
          <DialogContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p>{error}</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default LoginPage;
