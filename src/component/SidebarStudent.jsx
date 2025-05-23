import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

const SidebarStudent = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <div
      className={`
        bg-gray-400 w-64 min-h-screen flex flex-col fixed top-0 left-0 z-40 transform transition-transform duration-300
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:relative md:translate-x-0
      `}
    >
      <h2 className="py-5 text-xl text-center font-bold text-gray-800">
        Dashboard
      </h2>

      {/* Close button for mobile */}
      <IoMdClose
        className="md:hidden absolute top-4 bg-gray-300 rounded-md right-3 w-8 h-8 flex items-center justify-center hover:bg-gray-200"
        onClick={toggleSidebar}
        aria-label="Close Sidebar"
      />

      <nav className="flex-1 overflow-y-auto mt-6 px-4 pb-6">
        <ul className="flex flex-col gap-4">
          <SidebarItem to="/layoutstudent/courses" label="Courses" />
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

export default SidebarStudent;
