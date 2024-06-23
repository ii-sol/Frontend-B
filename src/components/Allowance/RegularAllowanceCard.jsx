import React from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import { styled } from "styled-components";

import { normalizeNumber } from "../../utils/NormalizeNumber";

const RegularAllowanceCard = ({ period, allowance, startDate, endDate }) => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/allowance/registration");
  };

  if (!allowance) {
    return (
      <RegisterButton onClick={handleRegisterClick}>
        <span tw="text-[#346BAC]">정기용돈</span>등록하기
      </RegisterButton>
    );
  }

  return (
    <Container>
      <Content>
        <PeriodTag status={period}>{period}</PeriodTag>
        <Allowance>{normalizeNumber(allowance)}원</Allowance>
        <Period>
          {startDate}~{endDate}
        </Period>
      </Content>
      <ButtonWrapper>
        <Button onClick={handleRegisterClick}>변경하기</Button>
        <Button>해지하기</Button>
      </ButtonWrapper>
    </Container>
  );
};

export default RegularAllowanceCard;

const Container = styled.div`
  ${tw`
  flex
  p-5
  gap-1
  w-full
  mb-4
  `}
  height: 128px;
  border-radius: 20px;
  box-shadow: 0px 0px 15px 0px rgba(151, 178, 221, 0.4);
  background-color: white;
`;

const RegisterButton = styled.button`
  ${tw`
  flex
  flex-col
  justify-center
  items-center
  p-5
  w-full
  mb-4
  `}
  height: 128px;
  border-radius: 20px;
  background-color: rgba(151, 178, 221, 0.4);
  box-shadow: 0px 0px 15px 0px rgba(151, 178, 221, 0.4);
  font-size: 20px;
  font-weight: 700;
`;

const Content = styled.div`
  ${tw`
  flex
  flex-col
  items-start
  gap-1
  `}
`;

const PeriodTag = styled.div`
  font-size: 13px;
  font-weight: 500;
  padding: 4px 8px;
  margin: 3px 0px;
  border-radius: 5px;
  color: #346bac;
  background-color: #d5e0f1;
`;

const Allowance = styled.div`
  color: #154b9b;
  font-size: 17px;
  font-weight: 700;
`;

const Period = styled.div`
  font-size: 12px;
`;

const ButtonWrapper = styled.div`
  ${tw`flex flex-col h-full justify-center items-end gap-3 ml-auto`}
`;

const Button = styled.button`
  background: #f4f9ff;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  width: 80px;
  height: 27px;
  &:hover {
    background-color: rgba(151, 178, 221, 0.4);
  }
`;
