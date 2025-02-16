import { useState } from 'react';
import LocationAutocomplete from './LocationAutocomplete';
import axios from 'axios';

const DonateForm = () => {
  const [location, setLocation] = useState('');
  const [formData, setFormData] = useState({
    category: '',
    itemName: '',
    description: '',
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in to submit a donation.');
        return;
      }
      const data = new FormData();
      data.append('category', formData.category);
      data.append('itemName', formData.itemName);
      data.append('description', formData.description);
      data.append('location', location); // Use the location state
      if (formData.photo) {
        data.append('photo', formData.photo);
      }

      const response = await axios.post('http://localhost:5000/api/donation', data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Donation submitted:', response.data);
      alert('Donation submitted successfully!');
    } catch (err) {
      console.error('Error submitting donation:', err.response?.data || err.message);
      alert('Failed to submit donation. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
      <h3 className="mb-4">Donate Items</h3>
      <div className="mb-3">
        <label className="form-label">Category</label>
        <select
          name="category"
          className="form-select"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="food">Food</option>
          <option value="clothes">Clothes & Footwear</option>
          <option value="books">Books & Stationery</option>
          <option value="furniture">Furniture & Gadgets</option>
          <option value="compost">Animal Feed & Compost Waste</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Item Name</label>
        <input
          type="text"
          name="itemName"
          className="form-control"
          value={formData.itemName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          name="description"
          className="form-control"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Location</label>
        <LocationAutocomplete onPlaceSelected={(place) => setLocation(place)} />
      </div>
      <div className="mb-3">
        <label className="form-label">Upload Photo</label>
        <input
          type="file"
          name="photo"
          className="form-control"
          onChange={(e) => setFormData({ ...formData, photo: e.target.files[0] })}
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">
        Submit
      </button>
    </form>
  );
};

export default DonateForm;