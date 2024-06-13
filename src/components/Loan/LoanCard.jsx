import React from "react";
import tw from "twin.macro";
import loanIcon from "~/assets/img/child/loan.svg";

const LoanCard = ({ amount, period, totalAmount }) => (
  <div tw="bg-white w-full rounded-2xl shadow-lg p-4 flex flex-col">
    <div tw="flex items-center mb-2">
      <span tw="bg-blue-100 text-blue-500 py-1 px-2 mt-1 text-sm rounded-full">
        D-Day
      </span>
    </div>
    <span tw="text-lg font-bold mt-1">{amount}원</span>
    <p tw="text-xs text-gray-500 mt-2">{period}</p>
    <p tw="text-sm text-gray-500 mt-1">대출 총액 : {totalAmount}원</p>
    <img src={loanIcon} alt="Loan Icon" tw="ml-auto mt-6 w-20 h-20" />
  </div>
);

export default LoanCard;
