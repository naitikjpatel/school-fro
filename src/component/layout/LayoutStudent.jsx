import { Outlet } from "react-router";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import SidebarStudent from "../SidebarStudent";
import Header from "../Header";

const LayoutStudent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex w-full min-h-screen relative">
      {/* Sidebar */}
      <SidebarStudent
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Hamburger for mobile */}
      <GiHamburgerMenu
        className="md:hidden fixed top-4 left-4 z-50 text-white p-2 rounded-md shadow-lg"
        onClick={toggleSidebar}
      />

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={toggleSidebar} />
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LayoutStudent;
