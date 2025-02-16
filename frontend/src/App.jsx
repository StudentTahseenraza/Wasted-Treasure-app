// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Donate from './pages/Donate';
import Request from './pages/Request';
import Leaderboard from './pages/Leaderboard';
import Signup from './components/Signup';
import Login from './components/Login';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';
import About from './pages/About';
import Mission from './pages/Mission';
import Books from './pages/Books';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Sidebar /> {/* Add Sidebar here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Mission" element={<Mission />} />
        <Route path="/books" element={<Books />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/donate" element={<Donate />} />
          <Route path="/request" element={<Request />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;