// components/AddCourseModal.js
import React, { useState } from 'react';
import axios from 'axios';

const AddCourseModal = ({ isOpen, onClose, onAddCourse }) => {
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:9999/api/course/addCourse', {
        courseName,
        courseDescription,
      });
      onAddCourse(response.data);
      onClose();
    } catch (error) {
      console.error('Error adding course:', error);
    } finally {
      setLoading(false);
      setCourseName('');
        setCourseDescription('');
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-opacity-50 flex justify-center items-center p-4 "
      onClick={onClose}
    >
      <div
        className="bg-white shadow-xl max-w-lg w-full p-6 relative animate-fadeIn  border-1 rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Add New Course</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="courseName" className="block text-sm font-medium text-gray-700">
              Course Name
            </label>
            <input
              type="text"
              id="courseName"
              name="courseName"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="courseDescription" className="block text-sm font-medium text-gray-700">
              Course Description
            </label>
            <textarea
              id="courseDescription"
              name="courseDescription"
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
              rows="4"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 text-white rounded-md ${
                loading ? 'bg-gray-500' : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >

                
              {loading ? 'Adding...' : 'Add Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourseModal;
