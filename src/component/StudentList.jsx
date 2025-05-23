import React, { useState, useEffect } from "react";
import axios from "axios";
import { PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/outline";
import Modal from "./Modal";
import AddStudentFormModal from "./AddStudentFormModal";
import { useNavigate } from "react-router";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch students from the API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9999/api/users/getAllUser"
        );
        const studentData = response.data.filter(
          (user) => user.userType.userTypes === "Student"
        );
        setStudents(studentData);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const deleteStudent = async (studentId) => {
    try {
      await axios.delete(`http://localhost:9999/api/users/${studentId}`);
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student.userId !== studentId)
      );

      // Adjust currentPage if necessary
      const totalPages = Math.ceil((students.length - 1) / studentsPerPage);
      if (currentPage > totalPages && totalPages > 0) {
        setCurrentPage(totalPages);
      } else if (totalPages === 0) {
        setCurrentPage(1); // Reset to page 1 if no students remain
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleDelete = (studentId) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      deleteStudent(studentId);
    }
  };

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const openModal = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  return (
    <div
      className="h-full bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 shadow-md rounded-lg mt-2 px-4 sm:px-6 lg:px-8 py-6"
    >
      <h1 className="font-bold text-2xl sm:text-3xl mb-6 text-center sm:text-left">Student List</h1>
      <button
        className="mb-4 px-3 py-2 sm:px-4 sm:py-2 bg-green-500 text-white rounded text-sm sm:text-base w-full sm:w-auto"
        onClick={() => setIsAddModalOpen(true)}
      >
        Add Student
      </button>
      <div className="overflow-x-visible">
        <table className="min-w-full table-auto border hidden sm:table">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="py-2 px-3 sm:py-3 sm:px-6 text-left text-xs sm:text-sm">First Name</th>
              <th className="py-2 px-3 sm:py-3 sm:px-6 text-left text-xs sm:text-sm">Last Name</th>
              <th className="py-2 px-3 sm:py-3 sm:px-6 text-left text-xs sm:text-sm">Email</th>
              <th className="py-2 px-3 sm:py-3 sm:px-6 text-left text-xs sm:text-sm">Course Count</th>
              <th className="py-2 px-3 sm:py-3 sm:px-6 text-left text-xs sm:text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="py-3 px-6 text-center text-gray-500 text-sm">
                  Loading...
                </td>
              </tr>
            ) : currentStudents.length > 0 ? (
              currentStudents.map((student) => (
                <tr key={student.userId} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-3 sm:py-3 sm:px-6 text-xs sm:text-sm text-gray-700">{student.firstName}</td>
                  <td className="py-2 px-3 sm:py-3 sm:px-6 text-xs sm:text-sm text-gray-700">{student.lastName}</td>
                  <td className="py-2 px-3 sm:py-3 sm:px-6 text-xs sm:text-sm text-gray-700">{student.email}</td>
                  <td className="py-2 px-3 sm:py-3 sm:px-6 text-xs sm:text-sm text-gray-700">{student.courses.length}</td>
                  <td className="py-2 px-3 sm:py-3 sm:px-6 text-xs sm:text-sm text-gray-700">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openModal(student)}
                        className="text-blue-500"
                      >
                        <EyeIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>
                      <button
                        onClick={() => navigate(`/editresult/${student.userId}`)}
                        className="text-yellow-500"
                      >
                        <PencilIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(student.userId)}
                        className="text-red-500"
                      >
                        <TrashIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-3 px-6 text-center text-gray-500 text-sm">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* mobile layout */}
        <div className="sm:hidden">
          {loading ? (
            <div className="text-center text-gray-500 text-sm py-4">Loading...</div>
          ) : currentStudents.length > 0 ? (
            currentStudents.map((student) => (
              <div
                key={student.userId}
                className="border rounded-lg mb-4 p-4 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <div>
                    
                    <p className="text-sm font-semibold text-gray-800">
                      Name :  {student.firstName} {student.lastName}
                    </p>
                    <p className="text-xs text-gray-600">Email Id : {student.email}</p>
                    {
                      student.courses.length > 0 ? (
                        student.courses.map((course, index) => (
                          <p key={index} className="text-xs text-gray-600">
                              Enrolled Course : {course.courseName}
                          </p>
                        ))
                      ) : (
                        <p className="text-xs text-gray-600">No Courses Enrolled</p>
                      )
                    }
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openModal(student)}
                      className="text-blue-500"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => navigate(`/editresult/${student.userId}`)}
                      className="text-yellow-500"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(student.userId)}
                      className="text-red-500"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 text-sm py-4">
              No students found
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center py-4 px-2 sm:px-6 gap-4">
        <div className="text-sm text-gray-600 text-center sm:text-left">
          Page{" "}
          <strong>
            {currentPage} of {Math.ceil(students.length / studentsPerPage)}
          </strong>{" "}
          | Showing{" "}
          <strong>
            {students.length > 0 ? indexOfFirstStudent + 1 : 0} to{" "}
            {Math.min(indexOfLastStudent, students.length)}
          </strong>{" "}
          of <strong>{students.length}</strong> entries
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => paginate(1)}
            disabled={currentPage === 1}
            className="px-3 py-1 sm:px-4 sm:py-2 bg-indigo-500 text-white rounded disabled:opacity-50 text-sm"
          >
            {"<<"}
          </button>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 sm:px-4 sm:py-2 bg-indigo-500 text-white rounded disabled:opacity-50 text-sm"
          >
            {"<"}
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(students.length / studentsPerPage)}
            className="px-3 py-1 sm:px-4 sm:py-2 bg-indigo-500 text-white rounded disabled:opacity-50 text-sm"
          >
            {">"}
          </button>
          <button
            onClick={() => paginate(Math.ceil(students.length / studentsPerPage))}
            disabled={currentPage === Math.ceil(students.length / studentsPerPage)}
            className="px-3 py-1 sm:px-4 sm:py-2 bg-indigo-500 text-white rounded disabled:opacity-50 text-sm"
          >
            {">>"}
          </button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        student={selectedStudent}
      />

      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg w-11/12 sm:w-full max-w-xl p-4 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setIsAddModalOpen(false)}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <AddStudentFormModal
              onClose={() => setIsAddModalOpen(false)}
              onSuccess={async () => {
                setIsAddModalOpen(false);
                setLoading(true);
                try {
                  const response = await axios.get(
                    "http://localhost:9999/api/users/getAllUser"
                  );
                  const studentData = response.data.filter(
                    (user) => user.userType.userTypes === "Student"
                  );
                  setStudents(studentData);
                } catch (error) {
                  console.error("Error fetching students:", error);
                } finally {
                  setLoading(false);
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;