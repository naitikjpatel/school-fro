import { Outlet } from "react-router";
import { useState } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";

const LayoutStudent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex w-full min-h-screen">
 
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="w-[100%] flex flex-col">
        <Header toggleSidebar={toggleSidebar} />

        <main className="">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LayoutStudent;
