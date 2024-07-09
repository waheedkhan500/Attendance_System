import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";

const StudentPrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  if (userInfo) {
    return <Outlet />;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default StudentPrivateRoute;
