import React from "react";
import tw from "twin.macro";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const RequestCard = () => {
  const navigate = useNavigate();
  return (
    <Container onClick={() => navigate("/invest/history/1")}>
      <div>
        <InfoDiv>
          투자
          <br /> 제안
        </InfoDiv>
      </div>
      <ColumnDiv>
        <Name>삼성전자</Name>
        <Div>100000원</Div>
        <Div>3주</Div>
      </ColumnDiv>
      <div tw="ml-auto">
        <StatusTag $dday={3}>
          {parseInt(3, 10) === 0 ? "D-day" : `D-3`}
        </StatusTag>
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
