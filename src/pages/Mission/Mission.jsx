import React from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import { styled } from "styled-components";
import * as S from "../../styles/GlobalStyles";

import DishwashingImg from "~/assets/img/Mission/dishwashing.svg";

import Header from "~/components/common/Header";
import MissionCard from "../../components/Mission/MissionCard";
import RequestCard from "../../components/Mission/RequestCard";

const Mission = () => {
  const navigate = useNavigate();

  const handleLeftClick = () => {
    navigate("/");
  };

  const handleReceiveRequestClick = () => {
    navigate("/mission/request/receive/detail");
  };

  const handleHistoryClick = () => {
    navigate("/mission/history");
  };

  const handleRequestClick = () => {
    navigate("/mission/create");
  };

  return (
    <div>
      <S.Container>
        <Header left={"<"} onLeftClick={handleLeftClick} title={"미션"} />
        {/* TODO: dday = due_date - craete_date */}
        {/* <RequestCard status="send" name="엄마" content="심부름 다녀오기" dday="3" onClick={handleSendRequestClick} /> */}
        <RequestCard status="receive" name="아들" content="심부름 다녀오기" dday="0" onClick={handleReceiveRequestClick} />
        <Menu>
          <S.Phrase>진행 중</S.Phrase>
          <S.HistoryLink onClick={handleHistoryClick}>지난 미션 &gt;</S.HistoryLink>
        </Menu>
        <S.CardContainer>
          <RegisterButton onClick={handleRequestClick}>
            <span tw="text-[#346BAC]">미션</span>요청하기
          </RegisterButton>
          <MissionCard dday="3" mission="설거지하기" allowance="10000" img={DishwashingImg} />
          <MissionCard dday="0" mission="설거지하기" allowance="10000" img={DishwashingImg} />
          <MissionCard dday="7" mission="설거지하기" allowance="10000" img={DishwashingImg} />
        </S.CardContainer>
      </S.Container>
    </div>
  );
};

export default Mission;

const RegisterButton = styled.button`
  ${tw`
  flex
  flex-col
  justify-center
  items-center
  p-5
  `}
  width: 148px;
  height: 232px;
  border-radius: 20px;
  background-color: rgba(151, 178, 221, 0.4);
  box-shadow: 0px 0px 15px 0px rgba(151, 178, 221, 0.4);
  font-size: 20px;
  font-weight: 700;
`;

const Menu = styled.div`
  ${tw`
  grid
  mb-2
  items-center
  `}
  grid-template-columns: auto auto;
`;
