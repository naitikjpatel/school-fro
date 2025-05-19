import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from './Loader';

const EditUserDetails = ({ userId = 5 }) => {
  const [user, setUser] = useState({
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    userType: {
      userTypeId: '',
      userTypes: '',
    },
    userDetails: {
      userDetailId: '',
      details: '',
      address: '',
      phone: '',
    },
    results: [],
    courses: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/api/users/${userId}`);
        console.log(response.data);
        
        setUser({
          userId: response.data.userId || '',
          firstName: response.data.firstName || '',
          lastName: response.data.lastName || '',
          email: response.data.email || '',
          userType: {
            userTypeId: response.data.userType?.userTypeId || '',
            userTypes: response.data.userType?.userTypes || '',
          },
          userDetails: {
            userDetailId: response.data.userDetails?.userDetailId || '',
            details: response.data.userDetails?.details || '',
            address: response.data.userDetails?.address || '',
            phone: response.data.userDetails?.phone || '',
          },
          results: response.data.results || [],
          courses: response.data.courses || [],
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch user details');
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      userDetails: {
        ...prev.userDetails,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log("Submit Data "+user);
    
    try {
      await axios.put(`http://localhost:9999/api/users/${userId}`, user);
      setLoading(false);
    } catch (err) {
      setError('Failed to update user details');
      setLoading(false);
    }
  };

  if (loading && !user.userDetails.details) {
    return (
      <div
        className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100"
      >
        <Loader />
      </div>
    );
  }

  return (
    <div
      className="flex justify-center items-center h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100"
      style={{ padding: '1.5rem' }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg transform transition-all duration-300 hover:shadow-3xl"
        style={{ padding: '2rem', margin: '1rem' }}
      >
        <h2
          className="text-3xl font-bold text-center text-indigo-800 tracking-tight"
          style={{ marginBottom: '2rem' }}
        >
          Edit Profile
        </h2>

        {error && (
          <div
            className="text-red-600 text-sm text-center bg-red-50 rounded-lg"
            style={{ marginBottom: '1.5rem', padding: '0.75rem' }}
          >
            {error}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label htmlFor="details" className="block text-md font-medium text-gray-800" style={{ marginBottom: '0.25rem' }}>
              About You
            </label>
            <textarea
              id="details"
              name="details"
              value={user.userDetails.details}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                color: '#374151',
              }}
              placeholder="Tell us about yourself"
              rows={4}
              required
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-md font-medium text-gray-800" style={{ marginBottom: '0.25rem' }}>
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={user.userDetails.address}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                color: '#374151',
              }}
              placeholder="Enter your address"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-md font-medium text-gray-800" style={{ marginBottom: '0.25rem' }}>
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={user.userDetails.phone}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                color: '#374151',
              }}
              placeholder="Enter your phone number"
              required
            />
          </div>
        </div>

        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transform transition-all duration-200 hover:scale-105"
            style={{ padding: '0.75rem 1.5rem', width: '70%' }}
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserDetails;
