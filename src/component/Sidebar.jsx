import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ isSidebarOpen }) => {
  return (
    <div className={`bg-gray-400 w-64 min-h-screen flex flex-col`}>
      {/* Header */}
      <h2 className="py-5 text-xl text-center font-bold text-gray-800">
        Dashboard
      </h2>

      {/* Navigation */}
      <nav className="h-screen overflow-y-auto mt-6">
        <ul className="flex flex-col gap-4 px-6">
          <SidebarItem to="/layoutstudent/courses" label="Courses" />
          {/* <SidebarItem to="/subjects" label="Subjects" /> */}
          <SidebarItem to="/layoutstudent/results" label="Results" />
          <SidebarItem to="/layoutstudent/editprofile" label="Edit Profile" />
        </ul>
      </nav>
    </div>
  );
};

const SidebarItem = ({ to, label }) => (
  <li>
    <Link
      to={to}
      className="block w-full text-center text-base font-medium text-gray-700 border border-gray-300 rounded-lg py-2.5 hover:bg-gray-100 hover:text-blue-600 transition-all duration-200 shadow-sm"
    >
      {label}
    </Link>
  </li>
);

export default Sidebar;
