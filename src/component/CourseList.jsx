// CourseList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import Modal from './Modal';
import CourseModal from './CourseModel';
import AddCourseModal from './AddCourseModal';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false); // State to control modal visibility

//   const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:9999/api/course/getAllCourse');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const deleteCourse = async (courseId) => {
    try {
      http://localhost:9999/api/course/3
      await axios.delete(`http://localhost:9999/api/course/${courseId}`);
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course.courseId !== courseId)
      );
      setCurrentPage(1); //reset to first page after any deletion happens
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handleDelete = (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      deleteCourse(courseId);
    }
  };

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const openModal = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };
  
  const handleSave = async (updatedCourse) => {
    try {
      await axios.put('http://localhost:9999/api/course/updateCourse', updatedCourse);
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course.courseId === updatedCourse.courseId ? updatedCourse : course
        )
      );
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };
  

  const handleAddCourse = (newCourse) => {
    setCourses((prevCourses) => [newCourse, ...prevCourses]);
  };

//   const openAddCourseModal = () => {
//     setIsAddCourseModalOpen(true);
//   };

//   const closeAddCourseModal = () => {
//     setIsAddCourseModalOpen(false);
//   };

return (
<div className="overflow-hidden bg-gradient-to-br h-full from-indigo-100 via-purple-100 to-pink-100 shadow-md rounded-lg mt-2 p-4">
  <h1 className="font-bold text-3xl mb-4">Course List</h1>
  <button
    className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
    onClick={() => setIsAddCourseModalOpen(true)}
  >
    Add New Course
  </button>

  {/* Table Layout for Larger Screens */}
  <div className="hidden sm:block overflow-x-auto">
    <table className="min-w-full table-auto border">
      <thead className="bg-indigo-600 text-white">
        <tr>
          <th className="py-3 px-6 text-left">Course Name</th>
          <th className="py-3 px-6 text-left">Description</th>
          <th className="py-3 px-6 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td colSpan="3" className="py-3 px-6 text-center text-gray-500">
              Loading...
            </td>
          </tr>
        ) : currentCourses.length > 0 ? (
          currentCourses.map((course) => (
            <tr key={course.courseId} className="border-b hover:bg-gray-50">
              <td className="py-3 px-6 text-sm text-gray-700">{course.courseName}</td>
              <td className="py-3 px-6 text-sm text-gray-700">
                {course.courseDescription || '-'}
              </td>
              <td className="py-3 px-6 text-sm text-gray-700">
                <div className="flex space-x-2">
                  <button onClick={() => openModal(course)} className="text-yellow-500">
                    <PencilIcon className="h-5 w-5 mr-3" />
                  </button>
                  <button onClick={() => handleDelete(course.courseId)} className="text-red-500">
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3" className="py-3 px-6 text-center text-gray-500">
              No courses found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>

  {/* Card Layout for Smaller Screens */}
  <div className="sm:hidden">
    <div className="space-y-4">
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : currentCourses.length > 0 ? (
        currentCourses.map((course) => (
          <div
            key={course.courseId}
            className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border"
          >
            <h2 className="font-semibold text-xl text-gray-800">{course.courseName}</h2>
            <p className="text-gray-600 mt-2">
              {course.courseDescription || 'No description available'}
            </p>
            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={() => openModal(course)}
                className="text-yellow-500 hover:text-yellow-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(course.courseId)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500">No courses found</div>
      )}
    </div>
  </div>

  {/* Pagination Controls */}
  <div className="flex justify-between items-center py-3">
    <div>
      <span className="text-sm text-gray-600">
        Page{' '}
        <strong>
          {currentPage} of {Math.ceil(courses.length / coursesPerPage)}
        </strong>{' '}
        | Showing{' '}
        <strong>
          {indexOfFirstCourse + 1} to {indexOfLastCourse}
        </strong>{' '}
        of <strong>{courses.length}</strong> entries
      </span>
    </div>
    <div className="flex space-x-2">
      <button
        onClick={() => paginate(1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-indigo-500 text-white rounded disabled:opacity-50"
      >
        {'<<'}
      </button>
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-indigo-500 text-white rounded disabled:opacity-50"
      >
        {'<'}
      </button>
      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === Math.ceil(courses.length / coursesPerPage)}
        className="px-4 py-2 bg-indigo-500 text-white rounded disabled:opacity-50"
      >
        {'>'}
      </button>
      <button
        onClick={() => paginate(Math.ceil(courses.length / coursesPerPage))}
        disabled={currentPage === Math.ceil(courses.length / coursesPerPage)}
        className="px-4 py-2 bg-indigo-500 text-white rounded disabled:opacity-50"
      >
        {'>>'}
      </button>
    </div>
  </div>

  {/* Modals */}
  <CourseModal
    isOpen={isModalOpen}
    onClose={closeModal}
    course={selectedCourse}
    onSave={handleSave}
  />

  <AddCourseModal
    isOpen={isAddCourseModalOpen}
    onClose={() => setIsAddCourseModalOpen(false)}
    onAddCourse={handleAddCourse}
  />
</div>

);
};

export default CourseList;
