import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CourseDetails = ({ userId = 4 }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/api/users/${userId}`);
        setCourses(response.data.courses);
        console.log(response.data.courses);
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
    <div className="mx-auto h-screen w-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 shadow-lg rounded-lg" style={{ marginTop: '50px', padding: '20px' }}>
      <div className="text-center mb-8">
      {courses.map((courseItem, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-800 mb-4">{index+1}.{courseItem.courseName}</h2>

          <p className="text-gray-700 mb-6 font-bold">
            Course Description: {courseItem.courseDescription || '-'}
          </p>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-indigo-600">Subjects</h3>
            <ul className="max-md:divide-y max-md:divide-gray-300">
              {courseItem.subjects.map((subject,index) => (
                <li key={subject.subjectId} className="py-2">
                  <span className="text-lg text-gray-800">{index+1}.{subject.subjectName}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Divider between courses */}
          {index < courses.length - 1 && <hr className="my-6 border-t-2 border-gray-300" style={{margin:'20px'}}/>}
        </div>
      ))}
      </div>
    </div>
  );
};

export default CourseDetails;


