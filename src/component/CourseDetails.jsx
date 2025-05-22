import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CourseDetails = ({ userId = Number(localStorage.getItem("userId")) }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/api/users/${userId}`);
        setCourses(response.data.courses);
      } catch (err) {
        setError('Failed to fetch course data');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [userId]);

  if (loading) {
    return <div className="text-center text-indigo-800">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  if (!courses || courses.length === 0) {
    return <div className="text-center text-gray-700">No course data available</div>;
  }

  return (
    <div className="mx-auto w-full h-screen px-4 py-8 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 shadow-lg rounded-lg">
      <div className="space-y-8 border rounded-md">
        {courses.map((courseItem, index) => (
          <div key={courseItem.courseId} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-indigo-800 mb-4">{index + 1}. {courseItem.courseName}</h2>
            <p className="text-gray-700 mb-6">{courseItem.courseDescription || 'No description available.'}</p>

            <div className="space-y-2 ms-3">
              <h3 className="text-xl font-semibold text-indigo-600">Subjects</h3>
              <ul className="space-y-1 ms-4  list-disc ">
                {courseItem.subjects.map((subject,index) => (
                  <li key={subject.subjectId} className=" items-center space-x-2 list-item">
                    <span className="text-lg text-gray-800">{index+1}. {subject.subjectName}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseDetails;
