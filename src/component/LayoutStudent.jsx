import { Outlet } from "react-router";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import { useState } from "react";

const LayoutStudent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="flex">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <div className="flex-1 relative overflow-auto">
          <Header toggleSidebar={toggleSidebar} />

          <main className="mt-[46px] px-5 md:px-8 pt-5 pb-[130px] md:pb-[335px] overflow-hidden">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default LayoutStudent;