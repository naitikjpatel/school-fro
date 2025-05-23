import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CourseCard from './CourseCard';

const CourseListS = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:9999/api/course/getAllCourse")
      .then(res => setCourses(res.data))
      .catch(err => console.error("Error fetching courses:", err));
  }, []);

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      {courses.map(course => (
        <CourseCard key={course.courseId} course={course} />
      ))}
    </div>


//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-2 h-full bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
//   {courses.map((course) => (
//     <CourseCard key={course.courseId} course={course} />
//   ))}
// </div>

  );
};

export default CourseListS;
