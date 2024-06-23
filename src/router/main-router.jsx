import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../pages/layout/MainLayout";

//pages
import Home from "../pages/Home/Home";
import NavLayout from "../pages/layout/NavLayout";
import InsideLayout from "../pages/layout/InsideLayout";

import Signup from "../pages/Auth/Signup";
import Login from "../pages/Auth/Login";
import Notification from "../pages/Notification/Notification";

import MyPage from "../pages/MyPage/MyPage";
import ChildManagement from "../pages/MyPage/ChildManagement";

import AccountHistory from "../pages/Account/History.jsx";

import AllowanceManagement from "../pages/Allowance/Management.jsx";
import AllowanceRegistration from "../pages/Allowance/Registration.jsx";
import AllowanceHistory from "../pages/Allowance/History.jsx";
import AllowanceUpdate from "../pages/Allowance/Update.jsx";

import Mission from "../pages/Mission/Mission.jsx";
import CreateMission from "../pages/Mission/CreateMission.jsx";
import CreateMissionComplete from "../pages/Mission/CreateMissionComplete.jsx";
import MissionReceiveDetail from "../pages/Mission/ReceivedDetail.jsx";
import MissionReceivedComplete from "../pages/Mission/ReceivedComplete.jsx";
import MissionHistory from "../pages/Mission/MissionHistory.jsx";

import Main from "../pages/Loan/Main";
import LoanHistory from "../pages/Loan/LoanHistory";
import LoanDetail from "../pages/Loan/DetailRequest.jsx";
import LoanDetailOnGoing from "../pages/Loan/DetailAccept.jsx";
import SelectAccount from "../pages/Account/SelectAccount.jsx";
import AccountMoney from "../pages/Account/Money.jsx";
import Send from "../pages/Account/Send.jsx";
import SendMoneyComplete from "../pages/Account/SendComplete.jsx";
import CreditScoreInfo from "../pages/Loan/Credit.jsx";

import InvestMain from "../pages/Investment/InvestMain";
import InvestHistory from "../pages/Investment/InvestHistory";
import SuggestionDetail from "../pages/Investment/SuggestionDetail";
import TradeHistory from "../pages/Investment/TradeHistory";
import StockList from "../pages/Investment/StockList";

const MainRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "signup", element: <Signup /> },
      { path: "login", element: <Login /> },
      { path: "notification", element: <Notification /> },
      {
        path: "mypage",
        children: [
          { path: "", element: <MyPage /> },
          { path: "child/:id", element: <ChildManagement /> },
        ],
      },
      {
        path: "account",
        children: [{ path: "history", element: <AccountHistory /> }],
      },
      {
        path: "allowance",
        children: [
          { path: "", element: <AllowanceManagement /> },
          { path: "registration", element: <AllowanceRegistration /> },
          { path: "update", element: <AllowanceUpdate /> },
          { path: "history", element: <AllowanceHistory /> },
        ],
      },
      {
        path: "mission",
        children: [
          { path: "", element: <Mission /> },
          { path: "history", element: <MissionHistory /> },
          {
            path: "create",
            children: [
              { path: "", element: <CreateMission /> },
              { path: "complete", element: <CreateMissionComplete /> },
            ],
          },
          {
            path: "request/receive",
            children: [
              { path: "detail", element: <MissionReceiveDetail /> },
              { path: "complete", element: <MissionReceivedComplete /> },
            ],
          },
        ],
      },
      {
        path: "/account",
        children: [
          {
            path: "select",
            element: <SelectAccount />,
          },
          {
            path: "money",
            element: <AccountMoney />,
          },
          {
            path: "send",
            element: <Send />,
          },
          {
            path: "complete",
            element: <SendMoneyComplete />,
          },
        ],
      },
      {
        path: "invest",
        children: [
          { path: "", element: <InvestMain /> },
          { path: "stocklist", element: <StockList /> },
          { path: "history", element: <InvestHistory /> },
          { path: "history/:id", element: <SuggestionDetail /> },
          { path: "tradehistory", element: <TradeHistory /> },
        ],
      },
      {
        path: "/loan",
        children: [
          { path: "main", element: <Main /> },
          { path: "history", element: <LoanHistory /> },
          { path: "detail/:loanId", element: <LoanDetail /> },
          { path: "detailOnGoing/:loanId", element: <LoanDetailOnGoing /> },
          { path: "credit", element: <CreditScoreInfo /> },
        ],
      },
    ],
  },
]);

export default MainRouter;
