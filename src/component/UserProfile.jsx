import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [user, setUser] = useState({
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    userType: {
      userTypeId: '',
      userTypes: ''
    },
    userDetails: {
      userDetailId: '',
      details: '',
      address: '',
      phone: ''
    },
    results: [],
    courses: []
  });

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:9999/api/users/4');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      userDetails: {
        ...prevUser.userDetails,
        [name]: value
      }
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:9999/api/users/${user.userId}`, user);
      alert('User details updated successfully!');
    } catch (error) {
      console.error('Error updating user details:', error);
      alert('Failed to update user details.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-indigo-800 mb-6">Edit Profile</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="details" className="block text-gray-700">Details</label>
            <input
              type="text"
              id="details"
              name="details"
              value={user.userDetails.details}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter your details"
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-gray-700">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={user.userDetails.address}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter your address"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-gray-700">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={user.userDetails.phone}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter your phone number"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-indigo-700 hover:to-purple-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;