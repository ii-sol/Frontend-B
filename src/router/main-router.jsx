import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../pages/layout/MainLayout";

//pages
import Home from "../pages/Home/Home";
import NavLayout from "../pages/layout/NavLayout";
import InsideLayout from "../pages/layout/InsideLayout";

import Signup from "../pages/Auth/Signup";
import Login from "../pages/Auth/Login";

import MyPage from "../pages/MyPage/MyPage";
import ChildManagement from "../pages/MyPage/ChildManagement";

import AccountHistory from "../pages/Account/History.jsx";

import AllowanceManagement from "../pages/Allowance/Management.jsx";
import AllowanceRegistration from "../pages/Allowance/Registration.jsx";
import AllowanceHistory from "../pages/Allowance/History.jsx";

const MainRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "signup", element: <Signup /> },
      { path: "login", element: <Login /> },
      {
        path: "mypage",
        children: [
          { path: "", element: <MyPage /> },
          { path: ":id", element: <ChildManagement /> },
        ],
      },
      {
        path: "account",
        children: [{ path: "history", element: <AccountHistory /> }],
      },
      {
        path: "allowance",
        children: [
          { path: "management", element: <AllowanceManagement /> },
          { path: "registration", element: <AllowanceRegistration /> },
          { path: "history", element: <AllowanceHistory /> },
        ],
      },
    ],
  },
]);

export default MainRouter;
