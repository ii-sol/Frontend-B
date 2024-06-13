import React, { useState } from "react";
import tw from "twin.macro";
import messageIcon from "~/assets/img/child/null.svg"; // 이미지 파일 경로를 확인하세요.

const months = [
  "01월",
  "02월",
  "03월",
  "04월",
  "05월",
  "06월",
  "07월",
  "08월",
  "09월",
  "10월",
  "11월",
  "12월",
];

const LoanHistory = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(new Date().getMonth());
  const [filter, setFilter] = useState("전체");

  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div tw="flex flex-col h-screen justify-between">
      <div tw="flex flex-col items-center p-5">
        <div tw="flex items-center mb-4 w-11/12 bg-blue-100 rounded-2xl p-2">
          <button onClick={handlePrevMonth} tw="text-xl mx-2 text-right">
            {"<"}
          </button>
          <p tw="text-xl flex-grow text-center">
            {year}년 {months[month]}
          </p>
          <button onClick={handleNextMonth} tw="text-xl mx-2 text-left">
            {">"}
          </button>
        </div>
        <div tw="flex mb-4 w-11/12">
          <button
            onClick={() => handleFilterChange("전체")}
            tw="bg-blue-500 text-white py-2 px-4 rounded-2xl mx-1"
            css={[filter === "전체" && tw`bg-blue-700`]}
          >
            전체
          </button>
          <button
            onClick={() => handleFilterChange("완료")}
            tw="bg-blue-500 text-white py-2 px-4 rounded-2xl mx-1"
            css={[filter === "완료" && tw`bg-blue-700`]}
          >
            완료
          </button>
          <button
            onClick={() => handleFilterChange("거절")}
            tw="bg-blue-500 text-white py-2 px-4 rounded-2xl mx-1"
            css={[filter === "거절" && tw`bg-blue-700`]}
          >
            거절
          </button>
        </div>
        <div tw="flex justify-center items-center w-11/12 h-72 rounded-2xl">
          <div tw="flex flex-col items-center">
            <img src={messageIcon} alt="No Loans" tw="mb-4 mt-14" />
            <p tw="text-gray-500 text-center text-xl">대출 내역이 없어요</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanHistory;
