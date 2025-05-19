import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserResults = ({ userId = 4 }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/api/users/${userId}/results`);
        setResults(response.data);
      } catch (err) {
        setError('Failed to fetch results');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [userId]);

  if (loading) return <div className="text-center text-indigo-600">Loading...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6">
        <h3 className="text-2xl font-semibold text-center text-indigo-800 mb-6">User Results</h3>
        <div className="space-y-4">
          {results.map((result, index) => (
            <div key={index} className="p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex justify-between">
              <h4 className="text-lg font-medium text-indigo-700 inline-block ">{result.subjectName}</h4>
              <p className={`mt-2 text-sm font-semibold inline-block ${result.status === 'Pass' || 'pass' ? 'text-green-500' : 'text-red-500'}`}>
                {result.status}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserResults;
