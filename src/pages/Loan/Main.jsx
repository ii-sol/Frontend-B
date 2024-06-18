import React from "react";
import tw from "twin.macro";
import messageIcon from "~/assets/img/child/message2.svg"; // 이미지 파일 경로를 확인하세요.
import { MdArrowBackIos } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import LoanCard from "../../components/Loan/LoanCard";

const Main = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (location.state?.from) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const handleCreateLoan = () => {
    navigate("/loan/who");
  };

  const handleHistory = () => {
    navigate("/loan/history-exist");
  };

  return (
    <>
      <div tw="flex flex-col h-screen mt-1">
        <header tw="flex justify-between items-center p-4 bg-white">
          <button tw="text-2xl" onClick={handleBack}>
            <MdArrowBackIos />
          </button>
          <h1 tw="text-2xl font-bold">대출</h1>
          <div tw="w-8" /> {/* Placeholder for space balance */}
        </header>

        <main tw="flex flex-col flex-1 justify-between p-5">
          {/* Credit Score */}
          <div tw="flex flex-col items-center bg-blue-400 w-full rounded-2xl p-4 mb-4 shadow-md">
            <div tw="flex items-center">
              <p tw="text-lg text-white font-bold">현재 정우성의 신뢰도는?</p>
            </div>
            <p tw="text-4xl font-bold mt-2 text-white font-bold">매우 높음</p>
          </div>
          {/* Loan Request */}
          <div tw="flex items-center bg-blue-100 w-full rounded-2xl p-4 mb-4 shadow-md">
            <img src={messageIcon} alt="Message Icon" tw="mr-4 w-10 h-10" />
            <div>
              <p tw="text-lg">From. 아들</p>
              <p tw="text-lg font-bold">자전거 사기</p>
            </div>
            <div tw="ml-auto">
              <p tw="text-blue-500">D-3</p>
            </div>
          </div>
          {/* Loan History Header */}
          <div tw="flex justify-between items-center w-full mb-4">
            <p tw="text-lg font-bold">아들(정우성)의 대출</p>
            <button tw="text-blue-500" onClick={handleHistory}>
              지난 내역
            </button>
          </div>
          {/* Loan History */}
          <div tw="grid grid-cols-2 gap-4 w-full">
            <LoanCard amount="100,000" period="2024.05.12 ~ 2024.06.12" totalAmount="200,000" />
            <LoanCard amount="100,000" period="2024.05.12 ~ 2024.06.12" totalAmount="200,000" />
            <LoanCard amount="100,000" period="2024.05.12 ~ 2024.06.12" totalAmount="200,000" />
            <LoanCard amount="100,000" period="2024.05.12 ~ 2024.06.12" totalAmount="200,000" />
          </div>
        </main>
      </div>
    </>
  );
};

export default Main;
