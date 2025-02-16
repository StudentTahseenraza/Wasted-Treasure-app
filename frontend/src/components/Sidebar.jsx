import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Settings from './Settings';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const foodRes = await axios.get('/api/food-donations', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const bookRes = await axios.get('/api/book-donations', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
  
        const foodNotifications = foodRes.data.slice(0, 3).map((donation) => ({
          type: 'Food Donation',
          item: donation.itemName,
          donor: donation.donorId.name,
        }));
  
        const bookNotifications = bookRes.data.slice(0, 3).map((donation) => ({
          type: 'Book Donation',
          item: donation.itemName,
          donor: donation.donorId.name,
        }));
  
        setNotifications([...foodNotifications, ...bookNotifications]);
      } catch (err) {
        console.error('Error fetching notifications:', err);
      }
    };
  
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode', !darkMode);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isOpen ? 'Close' : 'Menu'}
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'open' : ''} ${darkMode ? 'dark-mode' : ''}`}>
        <h3>Quick Links</h3>
        <ul>
          <li>
            <Link to="/" onClick={toggleSidebar}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/donate" onClick={toggleSidebar}>
              Donate
            </Link>
          </li>
          <li>
            <Link to="/request" onClick={toggleSidebar}>
              Request
            </Link>
          </li>
          <li>
            <Link to="/leaderboard" onClick={toggleSidebar}>
              Leaderboard
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={toggleSidebar}>
              About
            </Link>
          </li>
          <li>
            <Link to="/mission" onClick={toggleSidebar}>
              Mission
            </Link>
          </li>
          <li>
            <Link to="/books" onClick={toggleSidebar}>
              Books
            </Link>
          </li>
        </ul>

        <h3>Notifications</h3>
        <ul>
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <li key={index} style={{ marginBottom: '10px' }}>
                <strong>{notification.type}:</strong> {notification.item} by{' '}
                {notification.donor || notification.receiver}
              </li>
            ))
          ) : (
            <li>No new notifications.</li>
          )}
        </ul>

        <h3>Profile</h3>
        <ul>
          <li>
            <Link to="/profile" onClick={toggleSidebar}>
              My Profile
            </Link>
          </li>
          <li>
            <button
              onClick={() => {
                localStorage.removeItem('token');
                window.location.href = '/login';
              }}
            >
              Logout
            </button>
          </li>
        </ul>

        <h3>Settings</h3>
        <button
          onClick={() => setShowSettings(!showSettings)}
          style={{
            background: '#007bff',
            color: '#fff',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          {showSettings ? 'Hide Settings' : 'Show Settings'}
        </button>
        {showSettings && <Settings />}

        <h3>Dark Mode</h3>
        <button
          onClick={toggleDarkMode}
          style={{
            background: darkMode ? '#333' : '#007bff',
            color: '#fff',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </>
  );
};

export default Sidebar;