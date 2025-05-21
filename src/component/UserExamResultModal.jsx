// UserExamResultModal.js
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import ExamAndResultModal from "./ExamAndResultModal";

const UserExamResultModal = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    userType: {
      userTypeId: "",
      userTypes: "",
    },
    userDetails: {
      userDetailId: "",
      details: "",
      address: "",
      phone: "",
    },
    results: [],
    courses: [
      {
        courseId: "",
        courseName: "",
        courseDescription: "",
        subjects: [
          {
            subjectId: "",
            subjectName: "",
          },
        ],
      },
    ],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpenExamAndResult, setIsOpenExamAndResult] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9999/api/users/${userId}`
        );
        setUser({
          userId: response.data.userId || "",
          firstName: response.data.firstName || "",
          lastName: response.data.lastName || "",
          email: response.data.email || "",
          userType: {
            userTypeId: response.data.userType?.userTypeId || "",
            userTypes: response.data.userType?.userTypes || "",
          },
          userDetails: {
            userDetailId: response.data.userDetails?.userDetailId || "",
            details: response.data.userDetails?.details || "",
            address: response.data.userDetails?.address || "",
            phone: response.data.userDetails?.phone || "",
          },
          results: response.data.results || [],
          courses: response.data.courses?.length
            ? response.data.courses.map((course) => ({
                courseId: course.courseId || "",
                courseName: course.courseName || "",
                courseDescription: course.courseDescription || "",
                subjects: course.subjects?.length
                  ? course.subjects.map((subject) => ({
                      subjectId: subject.subjectId || "",
                      subjectName: subject.subjectName || "",
                    }))
                  : [{ subjectId: "", subjectName: "" }],
              }))
            : [
                {
                  courseId: "",
                  courseName: "",
                  courseDescription: "",
                  subjects: [{ subjectId: "", subjectName: "" }],
                },
              ],
        });
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user details");
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setUser((prev) => ({
  //       ...prev,
  //       [name]: value,
  //     }));
  //   };

  //   const handleNestedChange = (e, nestedField) => {
  //     const { name, value } = e.target;
  //     setUser((prev) => ({
  //       ...prev,
  //       [nestedField]: {
  //         ...prev[nestedField],
  //         [name]: value,
  //       },
  //     }));
  //   };

  //   const handleCourseChange = (e, index) => {
  //     const { name, value } = e.target;
  //     setUser((prev) => {
  //       const updatedCourses = [...prev.courses];
  //       updatedCourses[index] = { ...updatedCourses[index], [name]: value };
  //       return { ...prev, courses: updatedCourses };
  //     });
  //   };

  //   const handleSubjectChange = (e, courseIndex, subjectIndex) => {
  //     const { name, value } = e.target;
  //     setUser((prev) => {
  //       const updatedCourses = [...prev.courses];
  //       const updatedSubjects = [...updatedCourses[courseIndex].subjects];
  //       updatedSubjects[subjectIndex] = {
  //         ...updatedSubjects[subjectIndex],
  //         [name]: value,
  //       };
  //       updatedCourses[courseIndex] = {
  //         ...updatedCourses[courseIndex],
  //         subjects: updatedSubjects,
  //       };
  //       return { ...prev, courses: updatedCourses };
  //     });
  //   };

  const openExamAndResultModal = (subjectId) => {
    setSelectedSubjectId(subjectId);
    setIsOpenExamAndResult(true);
  };

  const closeExamAndResultModal = () => {
    setIsOpenExamAndResult(false);
    setSelectedSubjectId(null);
  };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     setLoading(true);
  //     setError(null);
  //
  //     try {
  //       await axios.put(`http://localhost:9999/api/users/${userId}`, user);
  //       setLoading(false);
  //       alert("User details updated successfully");
  //     } catch (err) {
  //       setError("Failed to update user details");
  //       setLoading(false);
  //     }
  //   };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 bg-opacity-10 flex items-center justify-center">
      <div className="bg-slate-100 p-6 rounded-lg shadow-xl w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">User Details</h2>
        <div className="max-h-[70vh] overflow-y-auto pr-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-600">
              First Name
            </label>
            <div className="mt-1 p-2 w-full border border-slate-300 rounded-md bg-slate-200 text-slate-800">
              {user.firstName}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-600">
              Last Name
            </label>
            <div className="mt-1 p-2 w-full border border-slate-300 rounded-md bg-slate-200 text-slate-800">
              {user.lastName}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-600">
              Email
            </label>
            <div className="mt-1 p-2 w-full border border-slate-300 rounded-md bg-slate-200 text-slate-800">
              {user.email}
            </div>
          </div>

          {user.courses.map((course, courseIndex) => (
            <div
              key={courseIndex}
              className="mb-6 border-t border-slate-300 pt-4"
            >
              <h3 className="text-lg font-semibold text-slate-700 mb-2">
                Course 
              </h3>

              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-600">
                  Course Name
                </label>
                <div className="mt-1 p-2 w-full border border-slate-300 rounded-md bg-slate-200 text-slate-800">
                  {course.courseName}
                </div>
              </div>

              {course.subjects.map((subject, subjectIndex) => (
                <div key={subjectIndex} className="ml-4 mb-4">
                  <h4 className="text-md font-medium text-slate-700 mb-2">
                    Subject 
                  </h4>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-600">
                      Subject Name
                    </label>
                    <div className="flex items-center justify-between">
                      <div className="mt-1 p-2 w-[70%] border border-slate-300 rounded-md bg-slate-200 text-slate-800">
                        {subject.subjectName}
                      </div>
                      <button
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded ms-2 me-2 px-3 py-2"
                        onClick={() =>
                          openExamAndResultModal
                          (Number(subject.subjectId))
                        }
                      >
                         Exam & Result
                      </button>

                      {/* <button className=" bg-indigo-600 hover:bg-indigo-700 text-white rounded px-3 py-2">
                        Add Result
                      </button> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}

          <div className="flex justify-end space-x-4 mt-4">
            <button
              type="button"
              className="px-4 py-2 bg-red-400 hover:bg-red-500 text-white rounded-md"
              onClick={() => window.history.back()}
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {isOpenExamAndResult && (
  <ExamAndResultModal
    isOpen={isOpenExamAndResult}
    onClose={closeExamAndResultModal}
    userId={Number(userId)}
    subjectId={selectedSubjectId}
  />
)}

    </div>
  );
};

export default UserExamResultModal;
