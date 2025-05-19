// CourseList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import Modal from './Modal';
import CourseModal from './CourseModel';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(7);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

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
      await axios.delete(`http://localhost:9999/api/courses/${courseId}`);
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course.courseId !== courseId)
      );
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

return (
    <div
        className={`overflow-x-auto bg-white shadow-md rounded-lg mt-2 `}
        style={{ padding: '20px' }}
    >
        <h1 className="font-bold text-3xl items-center" style={{marginBottom:"20px"}}>Course List</h1>
        <button
            className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
            onClick={() => console.log('Navigate to Add New Course')}
        >
            Add New Course
        </button>
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
                            <td className="py-3 px-6 text-sm text-gray-700">{course.courseDescription == null ? '-':course.courseDescription}</td>
                            <td className="py-3 px-6 text-sm text-gray-700">
                                <div className="flex space-x-2">
                                    <button onClick={() => openModal(course)} className="text-blue-500">
                                        <EyeIcon className="h-5 w-5" />
                                    </button>
                                    <button className="text-yellow-500">
                                        <PencilIcon className="h-5 w-5" />
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

        <div className="flex justify-between items-center py-3 px-6">
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

        <CourseModal isOpen={isModalOpen} onClose={closeModal} course={selectedCourse} />
    </div>
);
};

export default CourseList;
