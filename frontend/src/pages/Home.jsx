// import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container text-center mt-5">
      <h1 className="display-4 fw-bold">Welcome to the Wastage Management System</h1>
      <p className="lead mt-3">Reduce waste, help others, and make a difference!</p>
      <div className="mt-4">
        <Link to="/donate" className="btn btn-primary btn-lg me-3">
          Donate Items
        </Link>
        <Link to="/request" className="btn btn-success btn-lg">
          Request Items
        </Link>
      </div>
      <div className="mt-4">
        <p>
          New user? <Link to="/signup">Signup here</Link>.
        </p>
        <p>
          Already have an account? <Link to="/login">Login here</Link>.
        </p>
        {/* <p>
          Dashboard <Link to="/AdminDashboard">Dashboard</Link>.
        </p> */}
      </div>
    </div>
  );
};

export default Home;