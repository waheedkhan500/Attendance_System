import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const StudentLayout = () => {
  return (
    <>
      <ToastContainer position="top-center" />
      <Navbar />
      <Outlet />
    </>
  );
};

export default StudentLayout;
