import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import { styled } from "styled-components";

import Header from "~/components/common/Header";
import Button from "~/components/common/Button";
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

  const normalizeNumber = (number) => {
    return parseFloat(number).toLocaleString("en-US");
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
    <Container>
      <Header left={"<"} title={"용돈"} right={"취소"} />
      <FormWrapper>
        {step === 0 && (
          <StepWrapper>
            <Phrase>매달 얼마나 보낼까요?</Phrase>
            <KeypadInput displayedNumber={displayedNumber} setDisplayedNumber={setDisplayedNumber} />
          </StepWrapper>
        )}
        {step === 1 && (
          <StepWrapper tw="gap-0">
            <Phrase>얼마 동안 보낼까요?</Phrase>
            <Period onPeriodChange={handlePeriodChange} />
          </StepWrapper>
        )}
        {step === 2 && (
          <StepWrapper tw="gap-0">
            <ResultWrapper>
              <ResultPhrase>
                <span tw="text-[#154B9B]">양은수</span> 님에게
              </ResultPhrase>
              <ResultPhrase>{normalizeNumber(allowanceData.amount)}원을</ResultPhrase>
              <ResultPhrase>매달 보낼게요</ResultPhrase>
            </ResultWrapper>
          </StepWrapper>
        )}
        {step === 3 && (
          <StepWrapper>
            <CompleteContainer>
              <img src={MoneyImage} alt="완료" />
              <Phrase>정기 용돈 등록 완료</Phrase>
              <CompleteCard>
                <div>양은수 님에게</div>
                <div>6개월 동안</div>
                <div tw="text-[#154B9B]">매달 {normalizeNumber(allowanceData.amount)}원</div>
              </CompleteCard>
            </CompleteContainer>
          </StepWrapper>
        )}

        <ButtonWrapper>
          {step < 2 ? (
            <Button onClick={handleNext} text="다음">
              다음
            </Button>
          ) : step === 2 ? (
            <Button onClick={handleNext} text="보내기">
              보내기
            </Button>
          ) : (
            <Button onClick={handleAllowanceRedirect} text="완료">
              완료
            </Button>
          )}
        </ButtonWrapper>
      </FormWrapper>
    </Container>
  );
};

export default AllowanceRegistration;

const Container = tw.div`
  flex
  flex-col
  gap-3
  justify-center
`;

const FormWrapper = styled.div`
  ${tw`flex
  flex-col
  w-80
  gap-5
  rounded-[15px]
  h-full
  relative`}
  height: calc(100% - 60px);
`;

const StepWrapper = styled.div`
  ${tw`flex flex-col gap-4 flex-grow`}
`;

const ButtonWrapper = styled.div`
  ${tw`flex
  justify-between
  mt-4`}
`;

const ResultWrapper = styled.div`
  ${tw`flex flex-col justify-center items-center`}
`;

const Phrase = tw.div`
  flex
  text-xl
  font-bold
  justify-center
  m-5
`;

const ResultPhrase = tw.div`
  flex
  text-xl
  font-bold
  justify-center
`;

const CompleteContainer = tw.div`
  flex
  flex-col
  items-center
  gap-2
`;

const CompleteCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 15px;
  background: #f4f9ff;
  font-size: 25px;
  font-weight: 500;
  align-items: center;
  gap: 10px;
  padding: 20px;
`;
