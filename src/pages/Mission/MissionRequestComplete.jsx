import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setInitialState } from "../../../store/reducers/Mission/mission";
import tw from "twin.macro";
import { styled } from "styled-components";
import * as S from "../../../styles/GlobalStyles";

import Header from "~/components/common/Header";

import CompleteImage from "~/assets/img/common/complete.svg";

const MissionRequestComplete = () => {
  const location = useLocation();
  const { status } = location.state || {};

  const requestData = useSelector((state) => state.mission);
  const dispatch = useDispatch();

  const today = new Date();
  const dueDate = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000);

  const year = dueDate.getFullYear();
  const month = (dueDate.getMonth() + 1).toString().padStart(2, "0");
  const day = dueDate.getDate().toString().padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  const navigate = useNavigate();

  const handleLeftClick = () => {
    navigate("/parent/mission");
  };

  const handleNext = () => {
    dispatch(setInitialState());
    navigate("/parent/mission");
  };

  return (
    <S.Container>
      <Header left={"<"} onLeftClick={handleLeftClick} title={"미션"} />
      <S.FormWrapper>
        <S.StepWrapper>
          <CompleteContainer>
            <Img src={CompleteImage} alt="complete" />
            <S.Question>미션 처리 완료</S.Question>
            <S.CompleteCard tw="text-[20px]">
              <div>{requestData.parentName}님의</div>
              <div>{requestData.content} 요청을</div>
              <div>
                <StatusSpan status={status}>{status}</StatusSpan>했습니다.
              </div>
            </S.CompleteCard>
            <div tw="text-xs">
              <span tw="text-[#154B9B]">{formattedDate}</span>까지 응답하지 않으면 취소돼요.
            </div>
          </CompleteContainer>
        </S.StepWrapper>
        <S.ButtonWrapper>
          <S.BottomBtn onClick={handleNext}>완료</S.BottomBtn>{" "}
        </S.ButtonWrapper>
      </S.FormWrapper>
    </S.Container>
  );
};

export default MissionRequestComplete;

const Img = styled.img`
  width: 40%;
  height: auto;
  // box-shadow: 0px 0px 80px 0px rgba(151, 178, 221, 0.4);
`;

const CompleteContainer = styled.div`
  ${tw`flex
  flex-col
  items-center
  my-20
  gap-2`}
`;

const StatusSpan = styled.span`
  ${({ status }) => status === "거절" && tw`text-[#9B1D15]`}
  ${({ status }) => status === "수락" && tw`text-[#154B9B]`}
`;
