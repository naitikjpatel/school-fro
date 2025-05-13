import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditUserDetails = ({ userId = 4 }) => {
  const [userDetails, setUserDetails] = useState({
    details: '',
    address: '',
    phone: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/api/users/${userId}`);
        const { details, address, phone } = response.data.userDetails;
        setUserDetails({ details, address, phone });
      } catch (err) {
        setError('Failed to fetch user details');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log(userDetails);
    
    try {
      await axios.put(`http://localhost:9999/api/users/${userId}/1`, userDetails);
      alert('User details updated successfully');
    } catch (err) {
      setError('Failed to update user details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center text-indigo-800">Loading...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
        <form
            onSubmit={handleSubmit}
            className="bg-white p-10 rounded-lg shadow-lg w-full max-w-xl transform transition-all duration-300 hover:shadow-xl"
        >
            <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">Edit Profile</h2>

            <div className="space-y-5">
                <div>
                    <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-2">
                        About You
                    </label>
                    <textarea
                        id="details"
                        name="details"
                        value={userDetails.details}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 transition-all duration-200"
                        placeholder="Tell us about yourself"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                    </label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={userDetails.address}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 transition-all duration-200"
                        placeholder="Enter your address"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                    </label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={userDetails.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 transition-all duration-200"
                        placeholder="Enter your phone number"
                        required
                    />
                </div>
            </div>

            <div className="mt-6 flex justify-center">
                <button
                    type="submit"
                    className="py-3 px-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-md shadow-md hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transform transition-all duration-200 hover:scale-105"
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
