import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import { styled } from "styled-components";
import * as S from "../../../styles/GlobalStyles";

import { normalizeNumber } from "../../../utils/NormalizeNumber";

import Header from "~/components/common/Header";
import Period from "../../../components/common/Period";
import KeypadInput from "../../../components/Allowance/KeypadInput";

import MoneyImage from "~/assets/img/common/money.svg";

const AllowanceRegistration = () => {
  const [step, setStep] = useState(0);
  const [displayedNumber, setDisplayedNumber] = useState("0");
  const [selectedPeriod, setSelectedPeriod] = useState("0개월");
  const [allowanceData, setAllowanceData] = useState({
    childId: "",
    parentId: "",
    period: "",
    amount: "",
  });

  const navigate = useNavigate();

  const handleNext = () => {
    let error = "";

    switch (step) {
      case 0:
        if (isDisplayedNumberZero()) {
          error = "금액을 입력해주세요!";
        } else {
          setAllowanceData({
            ...allowanceData,
            amount: parseInt(displayedNumber),
          });
          setStep(step + 1);
        }
        break;
      case 1:
        if (isZeroMonthSelected()) {
          error = "기간을 선택해주세요!";
        } else {
          setAllowanceData({
            ...allowanceData,
            period: parseInt(selectedPeriod.replace("개월", "")),
          });
          setStep(step + 1);
        }
        break;
      case 2:
        setStep(step + 1);
      default:
        break;
    }

    if (error) {
      alert(error);
    }
  };

  const isDisplayedNumberZero = () => displayedNumber === "0";
  const isZeroMonthSelected = () => selectedPeriod === "0개월";

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
  };

  const handleAllowanceRedirect = () => {
    console.log(allowanceData);
    navigate("/allowance/management");
  };

  return (
    <S.Container>
      <Header left={"<"} title={"용돈"} right={"취소"} />
      <S.FormWrapper>
        {step === 0 && (
          <S.StepWrapper>
            <S.Question>매달 얼마나 보낼까요?</S.Question>
            <KeypadInput displayedNumber={displayedNumber} setDisplayedNumber={setDisplayedNumber} />
          </S.StepWrapper>
        )}
        {step === 1 && (
          <S.StepWrapper tw="gap-0">
            <S.Question>얼마 동안 보낼까요?</S.Question>
            <Period onPeriodChange={handlePeriodChange} />
          </S.StepWrapper>
        )}
        {step === 2 && (
          <S.StepWrapper tw="gap-0">
            <ResultWrapper>
              <ResultPhrase>
                <span tw="text-[#154B9B]">양은수</span> 님에게
              </ResultPhrase>
              <ResultPhrase>{normalizeNumber(allowanceData.amount)}원을</ResultPhrase>
              <ResultPhrase>매달 보낼게요</ResultPhrase>
            </ResultWrapper>
          </S.StepWrapper>
        )}
        {step === 3 && (
          <S.StepWrapper>
            <CompleteContainer>
              <img src={MoneyImage} alt="완료" />
              <S.Question>정기 용돈 등록 완료</S.Question>
              <S.CompleteCard style={{ gap: "2px" }}>
                <ResultPhrase>양은수 님에게</ResultPhrase>
                <ResultPhrase>6개월 동안</ResultPhrase>
                <ResultPhrase tw="text-[#154B9B]">매달 {normalizeNumber(allowanceData.amount)}원</ResultPhrase>
              </S.CompleteCard>
            </CompleteContainer>
          </S.StepWrapper>
        )}

        <S.ButtonWrapper>
          {step < 2 ? (
            <S.BottomBtn onClick={handleNext}>다음</S.BottomBtn>
          ) : step === 2 ? (
            <S.BottomBtn onClick={handleNext}>보내기</S.BottomBtn>
          ) : (
            <S.BottomBtn onClick={handleAllowanceRedirect}>완료</S.BottomBtn>
          )}
        </S.ButtonWrapper>
      </S.FormWrapper>
    </S.Container>
  );
};

export default AllowanceRegistration;

const ResultWrapper = styled.div`
  ${tw`flex flex-col justify-center items-center gap-1`}
  height: calc(100vh - 200px);
`;

const ResultPhrase = styled.div`
  ${tw`text-3xl
  font-bold
  text-center`}
`;

const CompleteContainer = styled.div`
  ${tw`flex
  flex-col
  items-center
  gap-2`}
`;
