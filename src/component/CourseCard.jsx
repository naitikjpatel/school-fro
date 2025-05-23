import React, { useState } from 'react';
import SubjectModal from './SubjectModal';
import axios from 'axios';
import { TrashIcon } from '@heroicons/react/16/solid';

const CourseCard = ({ course }) => {
  const [showModal, setShowModal] = useState(false);

  const deleteSubject = async (subjectId) => {
    try {
      await axios.delete(`http://localhost:9999/api/subject/${subjectId}`);
      course.subjects = course.subjects.filter(sub => sub.subjectId !== subjectId);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting subject:", error);
    }
  };

  const handleDelete =(subjectId)=>{
    if(window.confirm("Are you sure you want to delete this subject?")){
      deleteSubject(subjectId);
    }
  }
  return (
    <div className="border rounded-lg p-4 sm:p-6 shadow-sm bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 relative w-full max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-indigo-800 break-words">
          {course.courseName}
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm sm:text-base w-full sm:w-auto"
        >
          + Add Subject
        </button>
      </div>

      <p className="text-gray-600 mb-4 text-sm sm:text-base line-clamp-3">
        {course.courseDescription}
      </p>

      <ul className="list-disc ml-6 text-gray-700 text-sm sm:text-base">
        {course.subjects.length > 0 ? (
          course.subjects.map(sub => (
            <li
              key={sub.subjectId}
              // flex flex-col  sm:flex-row sm:justify-between sm:items-center : removed css from <li/> tag
              className="justify-center py-1 gap-1 list-item "
            >
              <div className='flex justify-between w-[50%] max-md:w-full'>
              <span className="w-fit">{sub.subjectName}</span>
              <button
                onClick={() => handleDelete(sub.subjectId)}
                className="text-red-600 hover:text-red-800  text-sm sm:text-base ml-2 w-fit sm:w-auto text-left sm:text-right"
              >
                {/* Delete */}
                 <TrashIcon className='h-4.5 w-fit pt-1'/>
              </button>
              </div>
            </li>
          ))
        ) : (
          <li className="italic text-gray-400 text-sm sm:text-base">
            No subjects assigned yet.
          </li>
        )}
      </ul>

      {showModal && (
        <SubjectModal courseId={course.courseId} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default CourseCard;