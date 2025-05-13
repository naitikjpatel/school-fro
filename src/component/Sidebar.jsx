import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ isSidebarOpen }) => {
  return (
    <div
      className={`${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } fixed inset-0 bg-gray-800 bg-opacity-75 md:relative md:translate-x-0 transition-transform duration-300 z-50`}
      style={{ width: "250px", padding: "20px" }}
    >
      <div
        className="flex justify-between items-center bg-gray-900 text-white"
        style={{
          padding: "5px 10px",
          borderRadius: "8px",
          marginTop: "45px",
        }}
      >
        <h2 className="text-xl font-semibold">Student Dashboard</h2>
      </div>
      <nav className="h-screen " style={{ overflowY: "hidden", marginTop: "20px" }}>
        <ul className="space-y-4 px-6 flex flex-col gap-3.5">
          <li>
            <Link
              to="/layoutstudent/courses"
              className="block py-2 text-lg text-white rounded-md border border-gray-700   hover:bg-gray-700 text-center" style={{ padding: "7px 0px" }}   
            >
              Courses
            </Link>
          </li>
          <li>
            <Link
              to="/subjects"
              className="block py-2 text-lg text-white hover:bg-gray-700 rounded-md  border border-gray-700 text-center" style={{ padding: "7px 0px" }}
            >
              Subjects
            </Link>
          </li>
          <li>
            <Link
              to="/layoutstudent/results"
              className="block py-2 text-lg text-white hover:bg-gray-700 rounded-md border border-gray-700 text-center" style={{ padding: "7px 0px" }}
            >
              Results
            </Link>
          </li>
          <li>
            <Link
              to="/layoutstudent/profile"
              className="block py-2 text-lg text-white hover:bg-gray-700 rounded-md border border-gray-700 text-center"  style={{ padding: "7px 0px" }}
            >
              Edit Profile
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
