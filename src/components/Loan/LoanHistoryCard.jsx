import React from "react";
import tw from "twin.macro";
import PropTypes from "prop-types";
import styled from "styled-components";

const LoanHistoryCard = ({
  status,
  title,
  amount,
  createDate,
  dueDate,
  onClick,
}) => {
  const formatAmount = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <Card onClick={onClick}>
      <StatusBadge status={status}>
        {status === "4" ? "완료" : "거절"}
      </StatusBadge>
      <Title>{title}</Title>
      <Amount>{formatAmount(amount)}원</Amount>
      <DateRange>
        <p>{createDate} ~ </p>
        {dueDate}
      </DateRange>
    </Card>
  );
};

LoanHistoryCard.propTypes = {
  status: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  createDate: PropTypes.string.isRequired,
  dueDate: PropTypes.string.isRequired,
};

export default LoanHistoryCard;

const Card = styled.div`
  ${tw`bg-white w-full h-52 rounded-2xl flex flex-col p-4`}height:232px;
  box-shadow: 0px 0px 15px 0px rgba(151, 178, 221, 0.4);
`;

const StatusBadge = styled.span`
  ${tw`rounded-lg text-white text-sm inline-flex justify-center px-2 py-1 w-11`}
  ${({ status }) => (status === "4" ? tw`bg-blue-500` : tw`bg-red-500`)}
`;

const Title = styled.span`
  ${tw`text-lg font-bold mt-3`}
`;

const Amount = styled.span`
  ${tw`text-lg font-bold`}
`;

const DateRange = styled.span`
  ${tw`text-xs text-gray-500 mt-2`}
`;
