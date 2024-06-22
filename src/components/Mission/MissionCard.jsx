import React, { useState } from "react";
import tw from "twin.macro";
import { styled } from "styled-components";

import { normalizeNumber } from "../../utils/NormalizeNumber";

import MissionImage from "~/assets/img/common/happySol.svg";

const MissionCard = ({ status, dday, mission, allowance }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleCardClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <Container onClick={handleCardClick}>
      <Content>
        {status && <StatusTag status={status}>{status === "6" ? "다 했어요!" : status}</StatusTag>}
        {dday && <StatusTag dday={dday}>{parseInt(dday, 10) === 0 ? "D-day" : `D-${dday}`}</StatusTag>}
        <Mission>{mission}</Mission>
        <Allowance>{normalizeNumber(allowance)}원</Allowance>
      </Content>
      {status === "6" || status === "완료" ? <Img src={MissionImage} alt="아이콘" /> : <></>}
      {status === "6" && isClicked && (
        <Overlay>
          <ButtonContainer>
            <ActionButton text="거절">거절</ActionButton>
            <ActionButton text="수락">수락</ActionButton>
          </ButtonContainer>
        </Overlay>
      )}
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

const StatusTag = styled.div`
  font-size: 13px;
  font-weight: 500;
  padding: 4px 8px;
  margin: 3px 0px;
  border-radius: 5px;
  color: ${({ status, dday }) => (status === "취소" || status === "6" || dday === "0" ? "#CC3535" : status || dday ? "#346BAC" : "#000000")};
  background-color: ${({ status, dday }) => (status === "취소" || status === "6" || dday === "0" ? "#FFDCDC" : status || dday ? "#D5E0F1" : "#FFFFFF")};
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

const Overlay = styled.div`
  ${tw`
    absolute
    inset-0
    bg-black
    bg-opacity-50
    flex
    items-center
    justify-center
    rounded-2xl
  `}
`;

const ButtonContainer = styled.div`
  ${tw`
    flex
    gap-2
  `}
`;

const ActionButton = styled.button`
  ${tw`
    bg-white
    rounded-lg
    text-sm
    font-extrabold
    shadow-md
    px-4
    py-2
    transition-all
  `}

  ${({ text }) => text === "거절" && tw`text-red-500`}
  ${({ text }) => text === "수락" && tw`text-blue-500`}

  &:hover {
    ${tw`bg-blue-600`}
  }
`;
