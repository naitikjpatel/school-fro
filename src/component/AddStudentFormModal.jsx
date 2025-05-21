import React, { useState, useEffect } from "react";
import axios from "axios";
import { ClockLoader } from "react-spinners";

const AddStudentFormModal = ({ onClose, onSuccess }) => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userDetails: {
      details: "",
      address: "",
      phone: "",
    },
    userType: {
      userTypeId: 1,
    },
    courseId: -1, // Store selected course ID
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [parentKey, childKey] = name.split(".");

    if (childKey) {
      setFormData((prevData) => ({
        ...prevData,
        [parentKey]: {
          ...prevData[parentKey],
          [childKey]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleCourseChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      courseId: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `http://localhost:9999/api/users/addUser/${formData.courseId}`,
        formData
      );
      console.log("Form Data Submitted:", response.data);
      onSuccess?.();
    } catch (err) {
      setError("An error occurred while submitting the form.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9999/api/course/getAllCourse"
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    if (formData.courseId !== -1) {
      console.log("Selected Course ID:", formData.courseId);
    }
  }, [formData.courseId]);

  return (
    
         <div 
        className="fixed inset-0  bg-black/50 backdrop-blur-sm transition-opacity flex justify-center items-center w-full" 
        aria-hidden="true"
      >
    <div className=" ">
      <form
        onSubmit={handleSubmit}
        className="bg-white   border-1 rounded-lg w-full max-w-lg transform transition-all duration-300"
        style={{ padding: "10px 20px" }}
      >
        <h2
          className="text-3xl font-bold text-center text-indigo-800 mb-8 tracking-tight"
          style={{ paddingTop: "20px" }}
        >
          Add New Student
        </h2>

        {error && (
          <p className="mb-4 text-red-600 text-sm text-center">{error}</p>
        )}

        <div className="space-y-6">
          {/* Other form fields */}
          <div className="flex flex-col ">
            <label
              htmlFor="firstName"
              className="block text-md font-medium text-gray-800 mb-1"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 text-gray-700 transition-all duration-200"
              placeholder="Enter first name"
              required
              style={{ padding: "10px 20px", marginBottom: "4px" }}
            />
          </div>

          <div className="flex flex-col ">
            <label
              htmlFor="lastName"
              className="block text-md font-medium text-gray-800 mb-1"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 text-gray-700 transition-all duration-200"
              placeholder="Enter last name"
              required
              style={{ padding: "10px 20px", marginBottom: "4px" }}
            />
          </div>

          <div className="flex flex-col ">
            <label
              htmlFor="email"
              className="block text-md font-medium text-gray-800 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 text-gray-700 transition-all duration-200"
              placeholder="Enter email address"
              required
              style={{ padding: "10px 20px", marginBottom: "4px" }}
            />
          </div>

          <div className="flex flex-col ">
            <label
              htmlFor="userDetails.address"
              className="block text-md font-medium text-gray-800 mb-1"
            >
              Address
            </label>
            <input
              type="text"
              id="userDetails.address"
              name="userDetails.address"
              value={formData.userDetails.address}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 text-gray-700 transition-all duration-200"
              placeholder="Enter address"
              required
              style={{ padding: "10px 20px", marginBottom: "4px" }}
            />
          </div>

          <div className="flex flex-col ">
            <label
              htmlFor="userDetails.phone"
              className="block text-md font-medium text-gray-800 mb-1"
            >
              Phone
            </label>
            <input
              type="text"
              id="userDetails.phone"
              name="userDetails.phone"
              value={formData.userDetails.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 text-gray-700 transition-all duration-200"
              placeholder="Enter phone number"
              required
              style={{ padding: "10px 20px", marginBottom: "4px" }}
            />
          </div>

          <div className="flex flex-col ">
            <label
              htmlFor="courseId"
              className="block text-md font-medium text-gray-800 mb-1"
            >
              Assign Course
            </label>
            <select
              id="courseId"
              name="courseId"
              value={formData.courseId}
              onChange={handleCourseChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 text-gray-700 bg-white transition-all duration-200"
              required
              style={{ padding: "10px 20px", marginBottom: "10px" }}
            >
              <option value="">Select a course</option>
              {courses.map((course) => (
                <option key={course.courseId} value={course.courseId}>
                  {course.courseName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-8 w-full flex justify-center gap-3 items-center">
          <button
            type="button"
            className="w-[25%] py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-[60%] py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transform transition-all duration-200 hover:scale-105"
            disabled={loading}
          >
            {loading ? (
              <ClockLoader size={25} color="#ffffff" loading={loading} />
            ) : (
              "Add Student"
            )}
          </button>
        </div>

        {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
      </form>
    </div>
  </div>            
    
  );
};

export default AddStudentFormModal;
