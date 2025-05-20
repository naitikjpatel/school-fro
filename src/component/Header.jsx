import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
const Header = ({ toggleSidebar, userId = Number(localStorage.getItem("userId")) }) => {
  const [user, setUser] = useState({
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    userType: {
      userTypeId: '',
      userTypes: ''
    },
    userDetails: {
      userDetailId: '',
      details: '',
      address: '',
      phone: ''
    },
    results: [],
    courses: []
  });

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/api/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);
  return (
    <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center w-full " > 
      {/* Left section with logo and hamburger */}
      <div className="flex items-center gap-4">
        {/* Sidebar Toggle Button (mobile only) */}
        <button
          onClick={toggleSidebar}
          className="text-indigo-600 md:hidden focus:outline-none"
          aria-label="Toggle Sidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Logo or School Name */}
        <h1 className="text-xl md:text-2xl font-semibold text-indigo-600">
          Greenwood High
        </h1>
      </div>

      {/* Right section with user name */}
      <div className="text-base md:text-lg font-medium text-indigo-800">
        {user.firstName}&nbsp;  {user.lastName}
      </div>
    </header>
  );
};

export default Header;
