import React from "react";
import tw from "twin.macro";
import { styled } from "styled-components";

import { normalizeNumber } from "../../utils/NormalizeNumber";

const RequestCardParent = ({ dday, allowance, message }) => {
  // TODO: dday 계산 로직

  return (
    <Container>
      <Content>
        <DdayTag dday={dday}>{dday === "0" ? "D-day" : `D-${dday}`}</DdayTag>
        <Allowance>{normalizeNumber(allowance)}원</Allowance>
        <Message>{message}</Message>
      </Content>
      <ButtonWrapper>
        <Button>수락</Button>
        <Button>거절</Button>
      </ButtonWrapper>
    </Container>
  );
};

export default RequestCardParent;

const Container = styled.div`
  ${tw`
  flex
  flex-col
  p-5
  gap-1
  relative
  `}
  width: 148px;
  height: 232px;
  border-radius: 20px;
  box-shadow: 0px 0px 15px 0px rgba(151, 178, 221, 0.4);
  background-color: white;
`;

const Content = styled.div`
  ${tw`
  flex
  flex-col
  items-start
  gap-1
  flex-grow
  `}
  font-weight: 700;
`;

const DdayTag = styled.div`
  font-size: 13px;
  font-weight: 500;
  padding: 4px 8px;
  margin: 3px 0px;
  border-radius: 5px;
  color: ${({ dday }) => (dday === "0" ? "#CC3535" : "#346BAC")};
  background-color: ${({ dday }) => (dday === "0" ? "#FFDCDC" : "#D5E0F1")};
`;

const Allowance = styled.div`
  color: #154b9b;
  font-size: 15px;
`;

const Message = styled.div`
  font-size: 12px;
`;

const ButtonWrapper = styled.div`
  ${tw`flex w-full justify-between`}
`;

const Button = styled.button`
  background: #f4f9ff;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  width: 50px;
  height: 27px;
  &:hover {
    background-color: rgba(151, 178, 221, 0.4);
  }
`;
