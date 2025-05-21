import React, { useState, useEffect } from "react";
import axios from "axios";
import { PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/outline";
import Modal from "./Modal";
import AddStudentFormModal from "./AddStudentFormModal";
import { Navigate, useNavigate } from "react-router";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const navigate=useNavigate();
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

  const 
  openModal = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  return (
    <div
    className={`overflow-x-auto h-full bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 shadow-md rounded-lg mt-2 `}
    style={{ padding: '20px' }}
>
    <h1 className="font-bold text-3xl items-center" style={{marginBottom:"20px"}}>Student List</h1>
    <button
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
        onClick={() => setIsAddModalOpen(true)}
      >
        Add Student
      </button>
      <table className="min-w-full table-auto border">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="py-3 px-6 text-left">First Name</th>
            <th className="py-3 px-6 text-left">Last Name</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Course Count</th>
            <th className="py-3 px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5" className="py-3 px-6 text-center text-gray-500">
                Loading...
              </td>
            </tr>
          ) : currentStudents.length > 0 ? (
            currentStudents.map((student) => (
              <tr key={student.userId} className="border-b hover:bg-gray-50">
                <td className="py-3 px-6 text-sm text-gray-700">
                  {student.firstName}
                </td>
                <td className="py-3 px-6 text-sm text-gray-700">
                  {student.lastName}
                </td>
                <td className="py-3 px-6 text-sm text-gray-700">
                  {student.email}
                </td>
                <td className="py-3 px-6 text-sm text-gray-700">
                  {student.courses.length}
                </td>
                <td className="py-3 px-6 text-sm text-gray-700">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openModal(student)}
                      className="text-blue-500"
                      style={{marginRight: "10px"}}
                    >
                      <EyeIcon className="h-5 w-5" />
                    </button>
                    <button className="text-yellow-500"  style={{marginRight: "10px"}}>
                      <PencilIcon className="h-5 w-5" onClick={()=> navigate(`/editresult/${student.userId}`)} />
                    </button>
                    <button
                      onClick={() => handleDelete(student.userId)}
                      className="text-red-500"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-3 px-6 text-center text-gray-500">
                No students found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-between items-center py-3 px-6">
        <div>
          <span className="text-sm text-gray-600">
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
          </span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => paginate(1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-indigo-500 text-white rounded disabled:opacity-50"
           
          >
            {"<<"}
          </button>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-indigo-500 text-white rounded disabled:opacity-50"
          >
            {"<"}
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(students.length / studentsPerPage)
            }
            className="px-4 py-2 bg-indigo-500 text-white rounded disabled:opacity-50"
          >
            {">"}
          </button>
          <button
            onClick={() =>
              paginate(Math.ceil(students.length / studentsPerPage))
            }
            disabled={
              currentPage === Math.ceil(students.length / studentsPerPage)
            }
            className="px-4 py-2 bg-indigo-500 text-white rounded disabled:opacity-50"
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
        <div className="fixed inset-0 z-50 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white  rounded-lg w-full max-w-xl">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setIsAddModalOpen(false)}
            >
              
            </button>
            <AddStudentFormModal
              onClose={() => setIsAddModalOpen(false)}
              onSuccess={() => {
                setIsAddModalOpen(false);
                fetchStudents(); // refresh list
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;