import React, { useState } from 'react';
import SubjectModal from './SubjectModal';
import axios from 'axios';
import { div } from 'framer-motion/client';

const CourseCard = ({ course }) => {
  const [showModal, setShowModal] = useState(false);

  const handleDeleteSubject = async (subjectId) => {
    try {
      // Send DELETE request to backend
      await axios.delete(`http://localhost:9999/api/subject/${subjectId}`);
      
      // Update the local state to reflect the deletion
      course.subjects = course.subjects.filter(sub => sub.subjectId !== subjectId);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting subject:", error);
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white relative">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-indigo-800">{course.courseName}</h2>
        <button
          onClick={() => setShowModal(true)}
          className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          + Add Subject
        </button>
      </div>

      <p className="text-gray-600 mb-2">{course.courseDescription}</p>

      <ul className="list-disc ml-6 text-gray-700" style={{
        listStyleType: 'disc',
      }}>
        {course.subjects.length > 0 ? (
          
          course.subjects.map(sub => (
            <li key={sub.subjectId} className="flex justify-between items-center py-1 ">
              {sub.subjectName}
              <button
                onClick={() => handleDeleteSubject(sub.subjectId)}
                className="ml-2 text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <li className="italic text-gray-400">No subjects assigned yet.</li>
        )}
      </ul>

      {showModal && (
        <SubjectModal courseId={course.courseId} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default CourseCard;
