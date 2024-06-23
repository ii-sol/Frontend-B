import React from "react";
import { Navigate } from "react-router-dom";
import isLogin from "./isLogin";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = isLogin();

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
