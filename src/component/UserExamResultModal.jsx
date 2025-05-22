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
            subjectId: 0,
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
        const userResponse = await axios.get(
          `http://localhost:9999/api/users/${userId}`
        );
        const userData = userResponse.data;

        // Fetch exam results for each subject
        const subjectsWithResults = await Promise.all(
          userData.courses.flatMap((course) =>
            course.subjects.map(async (subject) => {
              try {
                // Fetch results for the user and subject
                const resultResponse = await axios.get(
                  `http://localhost:9999/api/result/student/${userId}?subjectId=${subject.subjectId}`
                );
                const results = resultResponse.data;
        
                // Filter results to match the current subjectId
                const filteredResults = results.filter(
                  (result) => result.subjectId === subject.subjectId
                );
        
                // Return the subject with the filtered results
                return {
                  ...subject,
                  results: filteredResults,
                };
              } catch (error) {
                console.error(`Error fetching results for subject ${subject.subjectId}:`, error);
                return {
                  ...subject,
                  results: [], // Return empty results in case of error
                };
              }
            })
          )
        );

        console.log("Subject with results",subjectsWithResults);
        
        

        setUser({
          ...userData,
          courses: userData.courses.map((course, courseIndex) => ({
            ...course,
            subjects: course.subjects.map((subject, subjectIndex) => {
              const subjectWithResults = subjectsWithResults.find(
                (s) => s.subjectId === subject.subjectId
              );
              return {
                ...subject,
                results: subjectWithResults ? subjectWithResults.results : [],
              };
            }),
          })),
        });
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user details");
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId,isOpenExamAndResult]);

  const openExamAndResultModal = (subjectId) => {
    setSelectedSubjectId(subjectId);
    setIsOpenExamAndResult(true);
  };

  const closeExamAndResultModal = () => {
    setIsOpenExamAndResult(false);
    setSelectedSubjectId(null);
  };

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
                {course.courseName}
              </h3>

              {course.subjects.map((subject, subjectIndex) => (
                <div key={subjectIndex} className="ml-4 mb-4">
                    {/* <h4 className="text-md font-medium text-slate-700 mb-2">
                      {subject.subjectName}
                    </h4> */}
                  <div className="flex items-center justify-between">
                    <div className="mt-1 p-2 w-[70%] border border-slate-300 rounded-md bg-slate-200 text-slate-800">
                      {subject.subjectName}
                    </div>
                    
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white rounded ms-2 me-2 px-3 py-2"
                      onClick={() => openExamAndResultModal(subject.subjectId)}
                    >
                      Exam & Result
                    </button>
                  </div>
                  <div className="mt-2">
                    <h5 className="text-sm font-medium text-slate-600 ms-3">
                      Exam Results:
                    </h5>
                    {subject.results.length > 0 ? (
                      subject.results.map((result, resultIndex) => (
                        
                        <div
                          key={resultIndex}
                          className="mt-1 p-2 border border-slate-300 rounded-md ms-3"
                        >
                          <div className="flex justify-between">
                            <span className="font-semibold">
                              {result.examName}
                            </span>
                            <span
                              className={`font-semibold ${
                                result.status === "pass"
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {result.status === "pass" ? "Passed" : "Failed"}
                            </span>
                          </div>
                          <div className="text-sm text-slate-500">
                            {new Date(result.resultDate).toLocaleDateString()}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-slate-500 ms-3">
                        No results available
                      </p>
                    )}
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
