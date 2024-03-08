import React, { useState, useEffect } from 'react';
import UserNavbar from './UserNavbar';
import './UserDashboard.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.css';
import Loader from '../UserAuth/Loader';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, colors } from '@mui/material';

const UserDashboard = () => {
  const name = localStorage.getItem("name");
  const reg = localStorage.getItem("reg");
  const gender = localStorage.getItem("gender");
  const [crushCount, setCrushCount] = useState(null);
  const [crushList, setCrushList] = useState(null);
  const [matchedUsers, setMatchedUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [deleteData, setDeleteData] = useState({
    crushName: '',
    crushRegNumber: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCrushCount = async () => {
      try {
        const response = await axios.post('/crush-count/', {
          name: name,
          reg: reg,
          gender: gender,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          const { crush_count } = response.data;
          setCrushCount(crush_count);
        } else {
          console.error('Error fetching crush count:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching crush count:', error);
      }
    };

    const fetchCrushList = async () => {
      try {
        const response = await axios.post('/get-crush-list/', {
          name: name,
          reg: reg,
          gender: gender,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          const { crushlistregno, crushlistnames } = response.data;
          setCrushList({ regNos: crushlistregno, names: crushlistnames });
        } else {
          console.error('Error fetching crush list:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching crush list:', error);
      }
    };

    const fetchMatchedUsers = async () => {
      try {
        const response = await axios.post('/find-match/', {
          name: name,
          reg: reg,
          gender: gender,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          const { matches } = response.data;
          setMatchedUsers(matches);
        } else {
          console.error('Error fetching matched users:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching matched users:', error);
      }
    };
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("Fetching data...");

        await fetchCrushCount();
        await fetchCrushList();
        await fetchMatchedUsers();

        console.log("Data fetched successfully");
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const navigateToAddCrush = () => {
    navigate('/add-crush');
  };
  const handleOpenDialog = (crushName, crushRegNumber) => {
    setDeleteData({ crushName, crushRegNumber });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = async () => {
    const { crushName, crushRegNumber } = deleteData;

    try {
      setOpenDialog(false);
      setLoading(true);
      const response = await axios.post('/delete-crush', {
        name: name,
        reg: reg,
        gender: gender,
        crushName: crushName,
        crushRegNumber: crushRegNumber,
      });

      if (response.status === 200) {
        setSuccess(true);
        setError('Crush deleted successfully.');
        window.location.reload();
      } else {
        setSuccess(false);
        setError(`Error deleting crush: ${response.data.message}`);
      }
    } catch (error) {
      setSuccess(false);
      setError(`Error deleting crush: ${error.message}`);
    } finally {
      setLoading(false);
      setOpenDialog(false);
    }
  };

  return (
    <div className="landing-page">
      {loading && <Loader />}
      <UserNavbar />
      <section className="hero-section">
        <div className="hero-content">
          <h2>Welcome to LuvHub</h2>
          {crushCount !== null && crushCount !== 0 && (
            <p>
              {crushCount} people have 💘 crush on you @{name}🥰
            </p>
          )}
          <a href="/add-crush" className="cta-button">Add Crush</a>
        </div>
      </section>

      <section className='user-info'>
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
        {/* {crushCount !== null && (
          <div>
            <table>
              <tbody>
                <tr>
                  <td>Crush Count</td>
                </tr>
                <tr>
                  <td>{crushCount}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )} */}
        {crushList !== null && (
          <div className="table-container">
            <p>Crush List</p>
            <table>
              <thead>
                <tr>
                  <th>Registration Number</th>
                  <th>Name</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {crushList.regNos.flatMap((regNos, index) => (
                  regNos.map((regNo, innerIndex) => (
                    <tr key={`${index}-${innerIndex}`}>
                      <td>{regNo}</td>
                      <td>{crushList.names[index][innerIndex]}</td>
                      <td onClick={() =>
                        handleOpenDialog(
                          crushList.names[index][innerIndex],
                          regNo
                        )
                      } style={{ cursor: 'pointer' }}>
                        {/* <button
                          onClick={() =>
                            handleOpenDialog(
                              crushList.names[index][innerIndex],
                              regNo
                            )
                          }
                          style={{ cursor: 'pointer', color: 'red', border: 'none', background: 'none', padding: 0}}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button> */}
                        💔
                      </td>
                    </tr>
                  ))
                ))}
              </tbody>
            </table>
          </div>
        )}
        {matchedUsers !== null && matchedUsers.size !== 0 && (
          <div className="table-container">
            <p>Matched Users</p>
            <table>
              <thead>
                <tr>
                  <th>Registration Number</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {matchedUsers.map((matchedUser, index) => (
                  <tr key={index}>
                    <td>{matchedUser.crush_reg}</td>
                    <td>{matchedUser.crush_name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
        <DialogTitle style={{ color: 'red' }}>Confirm Delete</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this crush?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>

  );
};

export default UserDashboard;
