import React, { useState } from "react";
import tw from "twin.macro";
import LoanHistoryCard from "../../../components/Loan/LoanHistoryCard";
import Calendar from "../../../components/Loan/Calender";

const LoanHistoryExist = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(new Date().getMonth());
  const [filter, setFilter] = useState("전체");

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div tw="flex flex-col h-screen">
      <Calendar
        year={year}
        month={month}
        setYear={setYear}
        setMonth={setMonth}
      />
      <div tw="flex flex-col items-center p-5">
        <div tw="flex mb-4 w-full max-w-lg">
          <button
            onClick={() => handleFilterChange("전체")}
            tw="bg-blue-500 text-white py-2 px-4 rounded-2xl mx-1 text-center"
            css={[filter === "전체" && tw`bg-blue-700`]}
          >
            전체
          </button>
          <button
            onClick={() => handleFilterChange("완료")}
            tw="bg-blue-500 text-white py-2 px-4 rounded-2xl mx-1 text-center"
            css={[filter === "완료" && tw`bg-blue-700`]}
          >
            완료
          </button>
          <button
            onClick={() => handleFilterChange("거절")}
            tw="bg-blue-500 text-white py-2 px-4 rounded-2xl mx-1 text-center"
            css={[filter === "거절" && tw`bg-blue-700`]}
          >
            거절
          </button>
        </div>
        <div tw="grid grid-cols-2 md:grid-cols-2 gap-4 w-full max-w-lg">
          <LoanHistoryCard
            status="완료"
            amount="100,000원"
            period="2024.05.12 ~ 2024.06.12"
          />
          <LoanHistoryCard
            status="거절"
            amount="100,000원"
            period="2024.05.12 ~ 2024.06.12"
          />
          <LoanHistoryCard
            status="완료"
            amount="100,000원"
            period="2024.05.12 ~ 2024.06.12"
          />
          <LoanHistoryCard
            status="거절"
            amount="100,000원"
            period="2024.05.12 ~ 2024.06.12"
          />
        </div>
      </div>
    </div>
  );
};

export default LoanHistoryExist;
