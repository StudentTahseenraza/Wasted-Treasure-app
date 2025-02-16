// import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-4 mt-5">
      <div className="container">
        <p className="mb-2">&copy; 2023 Wastage Management System. All rights reserved.</p>
        <div className="d-flex justify-content-center gap-3">
          <a href="https://facebook.com" className="text-white">
            <i className="fab fa-facebook fa-lg"></i>
          </a>
          <a href="https://twitter.com" className="text-white">
            <i className="fab fa-twitter fa-lg"></i>
          </a>
          <a href="https://instagram.com" className="text-white">
            <i className="fab fa-instagram fa-lg"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;