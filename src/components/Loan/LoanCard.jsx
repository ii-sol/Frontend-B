import React from "react";
import { styled } from "styled-components";
import tw from "twin.macro";
import loanIcon from "~/assets/img/Loan/loan.svg";

import CharacterImg from "~/assets/img/common/shyShoo.svg";

const LoanCard = ({ amount, period, totalAmount, title, onClick }) => {
  const formatAmount = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div onClick={onClick}>
      <Card>
        <div tw="flex items-center mb-2">
          <span tw="bg-blue-100 text-blue-500 py-1 px-2 mt-1 text-sm rounded-full">
            {title}
          </span>
        </div>
        <span tw="text-lg font-bold mt-1">{formatAmount(amount)}원</span>
        <p tw="text-xs text-gray-500 mt-2">{period}</p>
        <p tw="text-sm text-gray-500 mt-1">
          빌린 금액 : {formatAmount(totalAmount)}원
        </p>
        <img src={CharacterImg} alt="Loan Icon" tw="ml-auto mt-6 w-20 h-20" />
      </Card>
    </div>
  );
};

export default LoanCard;

const Card = styled.div`
  ${tw`
  w-full
  rounded-2xl
  p-4
  flex
  bg-white
  flex-col
  items-center
  justify-center
  min-h-[232px]
  cursor-pointer
  `}
  height:232px;
  box-shadow: 0px 0px 15px 0px rgba(151, 178, 221, 0.4);
`;
