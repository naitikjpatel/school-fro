import { Outlet } from "react-router";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Header from "../Header";
import SidebarTeacher from "../SidebarTeacher";

const LayoutTeacher = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex w-full min-h-screen relative">
      <SidebarTeacher
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Hamburger for mobile */}
      <GiHamburgerMenu
        className="md:hidden fixed top-4 left-4 z-50 text-white p-2 rounded-md shadow-lg"
        onClick={toggleSidebar}
      />

      <div className="w-[100%]   flex flex-col overflow-y-auto">
        <Header toggleSidebar={toggleSidebar} />

        <main className="h-screen ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LayoutTeacher;
