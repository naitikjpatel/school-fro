// components/CourseModal.js
import React from 'react';

const CourseModal = ({ isOpen, onClose, course }) => {
  if (!isOpen || !course) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-transparent  bg-opacity-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 relative animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-2xl font-bold"
          onClick={onClose}
        >
          &times;
        </button> */}

        <div className="mb-4 text-center">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-2">
            Course Details
          </h2>
          <p className="text-sm text-gray-500">Detailed information about the course</p>
        </div>

        <div className="space-y-3 text-gray-700">
          <div>
            <strong>Course Name:</strong> {course.courseName}
          </div>
          <div>
            <strong>Description:</strong> {course.courseDescription || 'N/A'}
          </div>
          <div>
            <strong>Subjects:</strong>
            <ul className="list-disc pl-5">
              {course.subjects?.length > 0 ? (
                course.subjects.map((subject) => (
                  <li key={subject.subjectId}>{subject.subjectName}</li>
                ))
              ) : (
                <li>No subjects listed</li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseModal;
