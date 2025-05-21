import React, { useState } from 'react';
import axios from 'axios';

const SubjectModal = ({ courseId, onClose }) => {
  const [subjectName, setSubjectName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAdd = async () => {
    setLoading(true);
    setError(null);

    try {
      await axios.post(`http://localhost:9999/api/subject/addSubject/${courseId}`, {
        subjectName,
        courseId
      });
      onClose(); // Close modal
      window.location.reload(); // Refresh course list
    } catch (err) {
      setError("Failed to add subject.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-30 flex justify-center items-center z-50">


      {/* This Div For the Do BackGround Blur */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        aria-hidden="true"
      />
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative border-1 animate-fadeIn">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Subject</h3>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <input
          type="text"
          placeholder="Subject Name"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          className="w-full px-4 py-2 border rounded mb-4"
          required
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubjectModal;
