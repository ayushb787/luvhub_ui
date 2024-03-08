import React, { useState } from 'react';
import './SignupPage.css';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, colors } from '@mui/material';
import Loader from './Loader';

const SignupPage = () => {
  const [signupData, setSignupData] = useState({
    name: '',
    reg: '',
    gender: '',
    mail: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/add-user/', signupData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setSuccess(true);
        setError('Successfully Added User.');
      } else {
        setSuccess(false);
        setError(response.data.message || 'Error during signup. Please try again.\n');
      }
      setOpenDialog(true);
    } catch (error) {
      console.error('Error during signup:', error);
      setSuccess(false);
      setError(error.response?.data?.message || 'An error occurred during signup. Please try again.\n');
    } finally {
      setLoading(false);
      setOpenDialog(true);
    }
  };

  const spanElements = Array.from({ length: 50 }, (_, index) => (
    <span key={index} style={{ '--i': index }}></span>
  ));

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSignupData({
      name: '',
      reg: '',
      gender: '',
      mail: '',
      password: '',
    });
  };

  return (
    <div className='signup-outer-container'>
      <div className="container-signup ">
        {loading && <Loader />}
        <div className="signup-box">
          <h2>Signup</h2>
          <form onSubmit={handleSignupSubmit}>
            <div className="input-box-signup ">
              <input
                type="text"
                value={signupData.name}
                onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                required
              />
              <label>Name</label>
            </div>
            <div className="input-box-signup ">
              <input
                type="text"
                value={signupData.reg}
                onChange={(e) => setSignupData({ ...signupData, reg: e.target.value })}
                required
              />
              <label>Registration Number</label>
            </div>
            <div className="input-box-signup ">
              <input
                type="text"
                value={signupData.gender}
                onChange={(e) => setSignupData({ ...signupData, gender: e.target.value })}
                required
              />
              <label>Gender</label>
            </div>
            <div className="input-box-signup ">
              <input
                type="email"
                value={signupData.mail}
                onChange={(e) => setSignupData({ ...signupData, mail: e.target.value })}
                required
              />
              <label>Email</label>
            </div>
            <div className="input-box-signup ">
              <input
                type="password"
                value={signupData.password}
                onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                required
              />
              <label>Password</label>
            </div>
            <button type="submit" className="btn-signup ">
              Signup
            </button>
          </form>
        </div>
        {spanElements}
        <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
          <DialogTitle style={{ color: success ? 'green' : 'red' }}>
            {success ? 'Success!!!' : 'Error'}
          </DialogTitle>

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

export default SignupPage;
