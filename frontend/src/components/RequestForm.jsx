import { useState } from 'react';
import LocationAutocomplete from './LocationAutocomplete';
import axios from 'axios';

const RequestForm = () => {
  const [location, setLocation] = useState('');
<LocationAutocomplete onPlaceSelected={(place) => setLocation(place)} />
  const [formData, setFormData] = useState({
    category: '',
    itemName: '',
    description: '',
    location: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5000/api/request',
        {
          category: formData.category,
          itemName: formData.itemName,
          description: formData.description,
          location: formData.location,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log('Request submitted:', response.data);
      alert('Request submitted successfully!');
    } catch (err) {
      console.error('Error submitting request:', err.response?.data || err.message);
      alert('Failed to submit request. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
      <h3 className="mb-4">Request Items</h3>
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
        <input
          type="text"
          name="location"
          className="form-control"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-success w-100">Submit</button>
    </form>
  );
};

export default RequestForm;