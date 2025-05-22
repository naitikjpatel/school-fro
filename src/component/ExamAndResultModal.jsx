import React, { useState, useEffect } from "react";
import axios from "axios";

const ExamAndResultModal = ({ isOpen, onClose, subjectId ,userId}) => {
  const [subject, setSubject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [examResults, setExamResults] = useState([]); // To track the results

  useEffect(() => {
    if (!isOpen) return;

    const fetchSubject = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9999/api/subject/${subjectId}`
        );
        setSubject(response.data);
        // Initialize exam results state with the existing data
        const initialResults = response.data.exam.map((exam) => ({
          examId: exam.examId,
          examResult: "", // Default result for each exam
        }));
        setExamResults(initialResults);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch subject data");
        setLoading(false);
      }
    };

    fetchSubject();
  }, [isOpen, subjectId]);

  
  const handleChange = (e, examIndex) => {
    const updatedResults = [...examResults];
    updatedResults[examIndex].examResult = e.target.value;
    setExamResults(updatedResults);
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString(); 
    try {
     
      const resultsToSubmit = examResults.map((examResult) => ({
        status: examResult.examResult,
        resultDate: currentDate,
        users: { userId: userId }, 
        exam: { examId: examResult.examId },
      }));

      console.log("Results to submit:", resultsToSubmit);
      
     
      await axios.post("http://localhost:9999/api/result/addResult", resultsToSubmit);
      alert("Results saved successfully!");
      onClose();
    } catch (err) {

      setError("Failed to submit results");
    }
  };
  
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-6 shadow-lg w-96 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">
          Edit Subject Exam & Result {subjectId}
        </h2>
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
              <div className="mt-1 p-2 w-full border rounded-md">
                {subject.subjectName}
              </div>
            </div>

            {subject.exam.map((exam, examIndex) => (
              <div key={examIndex} className="mt-2">
                <div className="mt-2">
                  <div className="flex justify-between">
                    <label className="block text-sm font-medium text-gray-700">
                      Exam Types
                    </label>
                    <label className="block text-sm font-medium text-gray-700 me-[28%]">
                      Result
                    </label>
                  </div>
                  <div className="flex justify-between">
                    <div className=" h-fit mt-1 p-2 w-[50%] border rounded-md">
                      {exam.examType.examTypeName || ""}
                    </div>

                    <div className="">
                      <select
                        className="mt-1 p-[10px] w-full border rounded-md"
                        value={examResults[examIndex]?.examResult || ""}
                        onChange={(e) => handleChange(e, examIndex)}
                        name="examResult"
                        required
                      >
                        <option value="">Select Result</option>
                        <option value="pass">Pass</option>
                        <option value="fail">Fail</option>
                      </select>
                    </div>
                  </div>
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
