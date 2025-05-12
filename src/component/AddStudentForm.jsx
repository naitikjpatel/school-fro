import React, { useState } from 'react';
import axios from 'axios';
import { ClockLoader } from 'react-spinners';
const AddStudentForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    userDetails: {
      details: '',
      address: '',
      phone: '',
    },
    userType: {
      userTypeId: 0,
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [parentKey, childKey] = name.split('.');

    if (childKey) {
      setFormData((prevData) => ({
        ...prevData,
        [parentKey]: {
          ...prevData[parentKey],
          [childKey]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
        console.log(formData);
        
      const response = await axios.post('http://localhost:9999/api/users/addUser', formData);
      console.log('Form Data Submitted:', response.data);
      // Handle successful submission (e.g., redirect or show success message)
    } catch (err) {
      setError('An error occurred while submitting the form.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg transform transition-all duration-300 hover:shadow-3xl"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-800 mb-8 tracking-tight">
          Add New Student
        </h2>

        <div className="space-y-6">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-800 mb-1"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 text-gray-700 transition-all duration-200"
              placeholder="Enter first name"
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-800 mb-1"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 text-gray-700 transition-all duration-200"
              placeholder="Enter last name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-800 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 text-gray-700 transition-all duration-200"
              placeholder="Enter email address"
            />
          </div>

          <div>
            <label
              htmlFor="userDetails.address"
              className="block text-sm font-medium text-gray-800 mb-1"
            >
              Address
            </label>
            <input
              type="text"
              id="userDetails.address"
              name="userDetails.address"
              value={formData.userDetails.address}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 text-gray-700 transition-all duration-200"
              placeholder="Enter address"
            />
          </div>

          <div>
            <label
              htmlFor="userDetails.phone"
              className="block text-sm font-medium text-gray-800 mb-1"
            >
              Phone
            </label>
            <input
              type="text"
              id="userDetails.phone"
              name="userDetails.phone"
              value={formData.userDetails.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 text-gray-700 transition-all duration-200"
              placeholder="Enter phone number"
            />
          </div>

          <div>
            <label
              htmlFor="userType.userTypeId"
              className="block text-sm font-medium text-gray-800 mb-1"
            >
              User Type
            </label>
            <select
              id="userType.userTypeId"
              name="userType.userTypeId"
              value={formData.userType.userTypeId}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 text-gray-700 bg-white transition-all duration-200"
            >
              <option value={0} disabled>
                Select user type
              </option>
              <option value={1}>Student</option>
              <option value={2}>Teacher</option>
            </select>
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transform transition-all duration-200 hover:scale-105"
            disabled={loading}
          >
            {loading ? (
              <ClockLoader size={25} color="#ffffff" loading={loading} />
            ) : (
              'Add Student'
            )}
          </button>
        </div>

        {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
      </form>
    </div>
  );
};

export default AddStudentForm;


