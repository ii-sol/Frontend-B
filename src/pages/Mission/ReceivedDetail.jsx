import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import { styled } from "styled-components";
import * as S from "../../styles/GlobalStyles";

import { normalizeNumber } from "../../utils/normalizeNumber";

import MissionRequestImage from "~/assets/img/common/sdamSol.svg";

import Header from "~/components/common/Header";

const ReceivedDetail = () => {
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  const handleLeftClick = () => {
    navigate("/mission");
  };

  const handleReject = () => {
    setStatus("거절");
    navigate("/mission/request/receive/complete", { state: { status: "거절" } });
  };

  const handleAccept = () => {
    setStatus("수락");
    navigate("/mission/request/receive/complete", { state: { status: "수락" } });
  };

  return (
    <S.Container>
      <Header left={"<"} onLeftClick={handleLeftClick} title={"미션"} right={""} />
      <S.StepWrapper>
        <CompleteContainer>
          <S.Question tw="text-[25px]">미션을 요청받았어요!</S.Question>
          <Img src={MissionRequestImage} alt="mission" />
          <S.Question>딸</S.Question>
          <S.CompleteCard>
            <div>"책상 정리하기"</div>
            <div tw="text-[#154B9B]">{normalizeNumber(10000)}원</div>
            <div tw="text-base">미션 완료일 : 2024-06-13</div>
          </S.CompleteCard>
          <div tw="text-xs font-bold">
            <span tw="text-[#154B9B]">2024.06.9일</span> 까지 응답하지 않으면 취소돼요
          </div>
        </CompleteContainer>
        <S.BottomBtnWrapper>
          <S.rejectBtn onClick={handleReject}>거절</S.rejectBtn>
          <S.acceptBtn onClick={handleAccept}>수락</S.acceptBtn>
        </S.BottomBtnWrapper>
      </S.StepWrapper>
    </S.Container>
  );
};

export default ReceivedDetail;

const CompleteContainer = styled.div`
  ${tw`flex
  flex-col
  items-center
  my-8
  gap-2`}
`;

const Img = styled.img`
  width: 40%;
  height: auto;
  // box-shadow: 0px 0px 80px 0px rgba(151, 178, 221, 0.4);
`;
