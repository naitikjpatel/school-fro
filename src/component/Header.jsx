import React from "react";

const Header = ({ toggleSidebar }) => {
  return (

    <header className="bg-white flex justify-between items-center w-full fixed top-0 left-0" style={{ padding: "10px 20px", borderBottom: "1px solid #ddd", zIndex: 1000 }}>
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSidebar}
          className="text-indigo-600 md:hidden " style={{marginRight: "10px"}}
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
        <div className="lg:text-3xl md:text-3lg sm:text-lg font-semibold text-indigo-600">
          Greenwood High
        </div>
      </div>
      <div>
        <span className="lg:text-3xl md:text-3lg sm:text-lg font-medium text-indigo-800">John Doe</span>
      </div>
    </header>
  );
};

export default Header;

