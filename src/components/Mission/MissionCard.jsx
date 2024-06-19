import React from "react";
import tw from "twin.macro";
import { styled } from "styled-components";

import { normalizeNumber } from "../../utils/NormalizeNumber";

import MissionImage from "~/assets/img/common/happySol.svg";

const MissionCard = ({ onClick, status, dday, mission, allowance }) => {
  return (
    <Container onClick={onClick}>
      <Content>
        {status && <StatusTag status={status}>{status}</StatusTag>}
        {dday && <StatusTag dday={dday}>{parseInt(dday, 10) === 0 ? "D-day" : `D-${dday}`}</StatusTag>}
        <Mission>{mission}</Mission>
        <Allowance>{normalizeNumber(allowance)}원</Allowance>
      </Content>
      <Img src={MissionImage} alt="아이콘" />
    </Container>
  );
};

export default MissionCard;

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
  cursor: pointer;
`;

const Content = styled.div`
  ${tw`
  flex
  flex-col
  items-start
  gap-1
  `}
`;

const StatusTag = styled.div`
  font-size: 13px;
  font-weight: 500;
  padding: 4px 8px;
  margin: 3px 0px;
  border-radius: 5px;
  color: ${({ status, dday }) => (status === "취소" || dday === "0" ? "#CC3535" : status || dday ? "#346BAC" : "#000000")};
  background-color: ${({ status, dday }) => (status === "취소" || dday === "0" ? "#FFDCDC" : status || dday ? "#D5E0F1" : "#FFFFFF")};
`;

const Mission = styled.div`
  font-weight: 700;
`;

const Allowance = styled.div`
  color: #154b9b;
  font-size: 15px;
  font-weight: 700;
`;

const Img = styled.img`
  position: absolute;
  bottom: 12px;
  right: 10px;
  width: 78px;
  height: auto;
`;
