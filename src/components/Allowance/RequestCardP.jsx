import React from "react";
import tw from "twin.macro";
import { styled } from "styled-components";

import { normalizeNumber } from "../../utils/normalizeNumber";

const RequestCardP = ({ dday, receiver, allowance, img, message }) => {
  return (
    <Container>
      <Content>
        {dday && <DdayTag $dday={dday}>{dday === "0" ? "D-day" : `D-${dday}`}</DdayTag>}
        <Receiver>{receiver}</Receiver>
        <Allowance>{normalizeNumber(allowance)}원</Allowance>
        <Message>{message}</Message>
      </Content>
      <Img src={img} alt="아이콘" />
    </Container>
  );
};

export default RequestCardP;

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
  `}
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

const Receiver = styled.div`
  font-weight: 700;
`;

const Allowance = styled.div`
  color: #154b9b;
  font-size: 15px;
  font-weight: 700;
`;

const Message = styled.div`
  font-size: 12px;
  font-weight: 700;
`;

const Img = styled.img`
  position: absolute;
  bottom: 20px;
  right: 10px;
  width: 78px;
  height: auto;
`;

const Delete = styled.button`
  position: absolute;
  bottom: 12px;
  right: 20px;
  width: 56px;
  height: auto;
  border-radius: 5px;
  border: 1px solid #e5e5e5;
  background: #f4f9ff;
`;
