import React, { useState, useEffect } from "react";
import axios from "axios";

const ExamAndResultModal = ({ isOpen, onClose, subjectId }) => {
  const [subject, setSubject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isOpen) return;

    const fetchSubject = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9999/api/subject/${subjectId}`
        );
        setSubject(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch subject data");
        setLoading(false);
      }
    };

    fetchSubject();
  }, [isOpen, subjectId]);

  const handleChange = (e, examIndex, typeIndex = null) => {
    const { name, value } = e.target;
    setSubject((prevSubject) => {
      const updatedSubject = { ...prevSubject };

      if (examIndex !== null) {
        const updatedExams = [...updatedSubject.exam];
        const updatedExam = { ...updatedExams[examIndex] };

        if (typeIndex !== null) {
          const updatedExamTypes = [...updatedExam.examType];
          updatedExamTypes[typeIndex] = {
            ...updatedExamTypes[typeIndex],
            result: value,
          };
          updatedExam.examType = updatedExamTypes;
        } else {
          updatedExam.examResult = value;
        }

        updatedExams[examIndex] = updatedExam;
        updatedSubject.exam = updatedExams;
      } else {
        updatedSubject[name] = value;
      }

      return updatedSubject;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:9999/api/subject/${subjectId}`,
        subject
      );
      alert("Subject updated successfully");
      onClose();
    } catch (err) {
      setError("Failed to update subject");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-6 shadow-lg w-96 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Subject {subjectId}</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Subject Name
              </label>
              <input
                type="text"
                name="subjectName"
                value={subject.subjectName}
                onChange={(e) => handleChange(e, null)}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            {subject.exam.map((exam, examIndex) => (
              <div key={examIndex} className="mt-2">
              

                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Exam Types
                  </label>

                  <input
                    type="text"
                    
                    value={exam.examType.examTypeName || ""}
                   
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
              </div>
            ))}

            <div className="flex justify-end space-x-4 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Close
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Save
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ExamAndResultModal;
