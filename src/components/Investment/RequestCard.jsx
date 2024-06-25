import React from "react";
import tw from "twin.macro";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const RequestCard = ({ data }) => {
  const navigate = useNavigate();
  console.log(data);
  const deadlineDate = new Date(data.createDate + 3 * 24 * 60 * 60 * 1000);
  const currentDate = new Date();

  const timeDiff = deadlineDate - currentDate;
  const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  const dDayString = daysRemaining === 0 ? "D-day" : `D-${daysRemaining}`;
  return (
    <Container onClick={() => navigate(`/invest/history/${data.proposeId}`)}>
      <div>
        <InfoDiv>{data.tradingCode === 2 ? "매도" : "매수"}</InfoDiv>
      </div>
      <ColumnDiv>
        <Name>{data.companyName}</Name>
        <Div>{data.quantity}주</Div>
      </ColumnDiv>
      <div tw="ml-auto">
        <StatusTag $dday={daysRemaining}>{dDayString}</StatusTag>
      </div>
    </Container>
  );
};

export default RequestCard;

const Container = styled.div`
  ${tw`flex items-center bg-[#E9F2FF] w-full rounded-2xl p-4 my-4`}
`;

const InfoDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background-color: white;
  height: 65px;
  width: 65px;

  color: #346bac;

  font-size: 24px;
  font-weight: 700;
`;

const ColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-left: 10px;
`;

const Name = styled.div`
  color: #154b9b;
  font-size: 18px;
  font-weight: 600;
`;

const Div = styled.div`
  font-size: 15px;
  font-weight: 600;
`;

const StatusTag = styled.div`
  font-size: 15px;
  min-width: 60px;
  text-align: center;
  font-weight: 500;
  padding: 4px 8px;
  margin: 3px 0px;
  border-radius: 5px;
  color: ${({ $dday }) =>
    $dday === "0" ? "#CC3535" : $dday ? "#346BAC" : "#000000"};
  background-color: ${({ $dday }) =>
    $dday === "0" ? "#FFDCDC" : $dday ? "#D5E0F1" : "#FFFFFF"};
`;
