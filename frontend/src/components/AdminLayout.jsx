import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Sidebar from "../components/Sidebar";
import Topbar from "./Topbar";

const AdminLayout = () => {
  const { userInfo } = useSelector((state) => state.auth);
  if (userInfo && userInfo.role.toLowerCase() === "admin") {
    return (
      <>
        <ToastContainer position="top-center" />
        <div className="flex flex-row bg-neutral-200 h-screen w-screen overflow-hidden">
          <Sidebar />
          <div className="flex-1">
            <Topbar />
            <Outlet />
          </div>
        </div>
      </>
    );
  } else {
    return <Navigate to="/" replace />;
  }
};

export default AdminLayout;
