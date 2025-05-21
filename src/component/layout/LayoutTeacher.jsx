import { Outlet } from "react-router";
import { useState } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import SidebarTeacher from "../SidebarTeacher";

const LayoutTeacher = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex w-full min-h-screen">
      {/* Header */}
      <SidebarTeacher isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      {/* Sidebar + Main Content */}
      <div className="w-[100%]   flex flex-col overflow-y-auto">
        <Header toggleSidebar={toggleSidebar} />
        {/* Sidebar */}

        {/* Main Content */}
        <main className="h-screen ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LayoutTeacher;
