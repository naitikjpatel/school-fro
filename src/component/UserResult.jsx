import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserResults = ({ userId = Number(localStorage.getItem("userId") )}) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // const response = await axios.get(`http://localhost:9999/api/users/${userId}/results`);
        const response=await axios.get(`http://localhost:9999/api/result/student/${userId}`);
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
    <div className="flex justify-center h-full bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6  rounded-lg">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 h-fit">
        <h3 className="text-2xl font-semibold text-center text-indigo-800 mb-6">User Results</h3>
        <table className="table-auto w-full border-collapse border border-gray-200 " >
          <thead>
            <tr className="bg-indigo-100">
              <th className="border border-gray-300 px-4 py-2 text-indigo-800">Subject</th>
              <th className="border border-gray-300 px-4 py-2 text-indigo-800">Exam</th>
              <th className="border border-gray-300 px-4 py-2 text-indigo-800">Status</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr
                key={index}
                className="hover:bg-gray-100 transition-colors duration-300"
              >
                <td className="border border-gray-300 px-4 py-2 text-indigo-700">
                  {result.subjectName}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-indigo-700 text-center">
                  {result.examName}
                </td>
                <td
                  className={`border border-gray-300 px-4 py-2 text-right font-semibold ${
                    result.status.toLowerCase() === 'pass'
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}
                >
                  {result.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserResults;
