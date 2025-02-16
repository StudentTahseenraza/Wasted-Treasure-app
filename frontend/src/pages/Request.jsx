// import React from 'react';
import RequestForm from '../components/RequestForm';

const Request = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Request Items</h2>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <RequestForm />
        </div>
      </div>
    </div>
  );
};

export default Request;