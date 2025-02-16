// import React from 'react';
import DonateForm from '../components/DonateForm';

const Donate = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Donate Items</h2>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <DonateForm />
        </div>
      </div>
    </div>
  );
};

export default Donate;