import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddCrush.css';
import Loader from '../UserAuth/Loader';
import UserNavbar from './UserNavbar';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, colors } from '@mui/material';

const AddCrushPage = () => {
  const name = localStorage.getItem("name");
  const reg = localStorage.getItem("reg");
  const gender = localStorage.getItem("gender");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();


  const [crushData, setCrushData] = useState({
    crushName: '',
    crushRegNumber: '',
  });

  const handleAddCrush = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(
        '/add-crush/',
        {
          name: name,
          reg: reg,
          gender: gender,
          crushName: [crushData.crushName],
          crushRegNumber: [crushData.crushRegNumber],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        setCrushData({ ...crushData, crushName: '', crushRegNumber: '' });
        setSuccess(true);
        setError('Successfully Added Crush.');
      } else {
        setSuccess(false);
        setError('Failed to add crush list. Please try again.');
      }
      setOpenDialog(true);
    } catch (error) {
      console.error('Error adding crush list:', error);
      setSuccess(false);
      setError('An error occurred while adding the crush list. Please try again.');
    } finally {
      setLoading(false);
      setOpenDialog(true);
    }
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCrushData({
      crushName: '',
      crushRegNumber: '',
    });
  };

  return (
    <div className='outer-container-addcrush'>
      <UserNavbar />
      {(
        <div className="user-info-container">
          <div className="user-info-item">
            <table>
              <tbody>
                <tr>
                  <td><i className="fas fa-user"></i>Name</td>
                </tr>
                <tr>
                  <td>{name}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="user-info-item">
            <table>
              <tbody>
                <tr>
                  <td><i className="fas fa-id-card"></i>Registration</td>
                </tr>
                <tr>
                  <td>{reg}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="user-info-item">
            <table>
              <tbody>
                <tr>
                  <td><i className="fas fa-venus-mars"></i>Gender</td>
                </tr>
                <tr>
                  <td>{gender}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
      <div className="container-addcrush">
        {loading && <Loader />}

        <h2>Add Crush</h2>

        <form onSubmit={handleAddCrush}>
          <div className="add-crush-input-box">

            <input
              type="text"
              value={crushData.crushName}
              onChange={(e) => setCrushData({ ...crushData, crushName: e.target.value })}
              required
            />
            <label>Crush Name</label>
          </div>

          <div className="add-crush-input-box">
            <input
              type="text"
              value={crushData.crushRegNumber}
              onChange={(e) => setCrushData({ ...crushData, crushRegNumber: e.target.value })}
              required
            />
            <label>Crush Registration No.</label>
          </div>
          <button type="submit" className="btn-addcrush">
            Add Crush
          </button>
        </form>
      </div>
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
  );
};

export default AddCrushPage;
