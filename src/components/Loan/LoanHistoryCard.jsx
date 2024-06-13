import React from "react";
import tw from "twin.macro";

const LoanHistoryCard = ({ status, amount, period }) => (
  <div tw="bg-white w-full h-52 rounded-2xl shadow-lg flex flex-col">
    <span
      tw="py-1 px-4 rounded-full mb-2 ml-4 w-16 mt-5"
      css={[
        status === "완료" ? tw`bg-blue-500` : tw`bg-red-500`,
        tw`text-white`,
      ]}
    >
      {status}
    </span>
    <span tw="text-lg font-bold ml-4 mt-1">{amount}</span>
    <span tw="text-xs text-gray-500 mt-2 ml-4">{period}</span>
  </div>
);

export default LoanHistoryCard;
