import React, { useState, useEffect } from 'react';

const CourseModal = ({ isOpen, onClose, course, onSave }) => {
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    if (course) {
      setCourseName(course.courseName);
      setCourseDescription(course.courseDescription || '');
      setSubjects(course.subjects || []);
    }
  }, [course]);

  const handleSave = () => {
    if (courseName && courseDescription) {
      onSave({ ...course, courseName, courseDescription });
      onClose();
    } else {
      alert('Please fill in both fields');
    }
  };

  if (!isOpen || !course) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-opacity-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 text-center">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-2">
            Edit Course Details
          </h2>
        </div>

        <div className="space-y-3 text-gray-700">
          <div>
            <label htmlFor="courseName" className="block font-medium">
              Course Name:
            </label>
            <input
              id="courseName"
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="courseDescription" className="block font-medium">
              Description:
            </label>
            <textarea
              id="courseDescription"
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              rows="4"
            ></textarea>
          </div>

          {
            subjects.length > 0 ? (
              <div>
                <label className="block font-medium">Subjects:</label>
                <ul className="list-disc pl-5">
                  {subjects.map((subject, index) => (
                    <li key={index} className="text-gray-700">
                      {subject.subjectName}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-gray-500">No subjects available</p>
            )
          }

        </div>

        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded-md mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseModal;
