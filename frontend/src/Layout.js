import { Outlet } from "react-router-dom";
import React, { useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";


function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <Topbar toggleSidebar={toggleSidebar} />{" "}
      {/* Pass the toggleSidebar function to the Topbar */}
      <div
        className={`container-fluid ${
          sidebarOpen ? "sidebar-open" : "sidebar-closed"
        }`}
      >
        <div className="row">
          <Sidebar sidebarOpen={sidebarOpen} />{" "}
          {/* Pass the sidebarOpen state to the Sidebar */}
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
