// components/About.js
import React from "react";
import Header from "../component/Header";
import { Link } from "react-router";

const About = () => {
  const teamMembers = [
    { name: "John Doe", title: "Principal" },
    { name: "Jane Smith", title: "Vice Principal" },
    { name: "Emily Johnson", title: "Head of Curriculum" },
    { name: "Michael Lee", title: "Dean of Students" },
    { name: "Sara Patel", title: "Director of Innovation" },
    { name: "Robert Brown", title: "Student Counselor" },
    { name: "Laura Wilson", title: "Athletics Coordinator" },
    { name: "Daniel Kim", title: "Technology Lead" },
  ];

  return (
    <>
    <Link className="text-4xl md:text-2xl font-semibold text-indigo-600">
          Greenwood High
        
    </Link>
    <section className="py-16 bg-indigo-50 ">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-800">About Our School</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          Our school is committed to academic excellence, holistic development,
          and creating a nurturing space where students thrive and reach their
          full potential.
        </p>
      </div>

      {/* Info Cards */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 px-6 max-w-6xl mx-auto">
        <div className="bg-white p-8 shadow-lg rounded-lg hover:shadow-2xl transition-shadow">
          <h3 className="text-2xl font-semibold text-indigo-700">Our Mission</h3>
          <p className="mt-4 text-gray-600 leading-relaxed">
            To inspire lifelong learning and empower students to become
            compassionate, informed, and contributing members of a global
            society.
          </p>
        </div>

        <div className="bg-white p-8 shadow-lg rounded-lg hover:shadow-2xl transition-shadow">
          <h3 className="text-2xl font-semibold text-indigo-700">Our Values</h3>
          <ul className="mt-4 text-gray-600 list-disc list-inside space-y-2">
            <li>Integrity & Honesty</li>
            <li>Respect for Diversity</li>
            <li>Innovation in Learning</li>
            <li>Commitment to Excellence</li>
            <li>Social Responsibility</li>
          </ul>
        </div>

        <div className="bg-white p-8 shadow-lg rounded-lg hover:shadow-2xl transition-shadow">
          <h3 className="text-2xl font-semibold text-indigo-700">Our Vision</h3>
          <p className="mt-4 text-gray-600 leading-relaxed">
            To be a leader in providing quality education that prepares students
            to meet the challenges of a changing world and to lead meaningful
            lives.
          </p>
        </div>

        <div className="bg-white p-8 shadow-lg rounded-lg hover:shadow-2xl transition-shadow">
          <h3 className="text-2xl font-semibold text-indigo-700">Why Choose Us?</h3>
          <ul className="mt-4 text-gray-600 list-disc list-inside space-y-2">
            <li>Modern classrooms and digital tools</li>
            <li>Safe, inclusive and diverse environment</li>
            <li>Highly qualified and passionate faculty</li>
            <li>Wide range of extracurriculars</li>
            <li>Strong community and parent engagement</li>
          </ul>
        </div>
      </div>

      {/* Team Section */}
      <div className="mt-20 px-6 max-w-6xl mx-auto">
        <h3 className="text-3xl font-semibold text-center text-gray-800">
          Meet Our Team
        </h3>
        <p className="text-center mt-2 text-gray-600 max-w-xl mx-auto">
          We’re proud of the dedicated team of educators and administrators who
          lead with passion, integrity, and vision.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white p-6 shadow-lg rounded-lg hover:shadow-2xl transition-shadow"
            >
              {/* Placeholder Avatar */}
              <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-xl font-bold">
                {member.name.split(" ")[0][0]}
                {member.name.split(" ")[1][0]}
              </div>
              <h4 className="mt-4 text-lg font-semibold text-gray-800">
                {member.name}
              </h4>
              <p className="mt-1 text-gray-500">{member.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
};

export default About;
