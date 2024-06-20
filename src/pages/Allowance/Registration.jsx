import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import styled from "styled-components";
import * as S from "../../styles/GlobalStyles";

import { normalizeNumber } from "../../utils/NormalizeNumber";

import Header from "~/components/common/Header";

const Registration = () => {
  const [step, setStep] = useState(0);
  const [amount, setAmount] = useState("");
  const [period, setPeriod] = useState("");
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");

  const navigate = useNavigate();

  const handleLeftClick = () => {
    navigate("/allowance");
  };

  const handleRightClick = () => {
    if (window.confirm("정말 취소하시겠습니까?")) {
      dispatch(setInitialState());
      navigate("/mission");
    }
  };

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setAmount(value);
  };

  const handlePeriodChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setPeriod(value);
  };

  const handleNext = () => {
    if (step === 0) {
      if (!amount || parseInt(amount) <= 0) {
        setError1("금액을 올바르게 입력해주세요!");
        return;
      }
      if (!period || parseInt(period) <= 0 || parseInt(period) > 12) {
        setError2("기간을 1-12개월 사이로 입력해주세요!");
        return;
      }
      console.log(amount, period);
      setStep(1);
    } else {
      navigate("/allowance/management");
    }
  };

  return (
    <S.Container>
      <Header onLeftClick={handleLeftClick} title={"용돈"} right={"취소"} onRightClick={handleRightClick} />
      {step === 0 && (
        <StepWrapper>
          <div>
            <S.Phrase tw="text-[20px] ml-2">금액</S.Phrase>
            <StyledInputWrapper>
              <StyledInput type="text" placeholder="매달 얼마나 보낼까요?" value={amount === "" ? "" : normalizeNumber(amount)} onChange={handleAmountChange} />
              <StyledUnit>원</StyledUnit>
            </StyledInputWrapper>
            {error1 && <Error>{error1}</Error>}
          </div>
          <div>
            <S.Phrase tw="text-[20px] ml-2">기간</S.Phrase>
            <StyledInputWrapper>
              <StyledInput type="text" placeholder="얼마 동안 보낼까요? (1~12)" value={period} onChange={handlePeriodChange} />
              <StyledUnit>개월</StyledUnit>
            </StyledInputWrapper>
            {error2 && <Error>{error2}</Error>}
          </div>
        </StepWrapper>
      )}
      {step === 1 && (
        <CompleteContainer>
          <ResultWrapper>
            <ResultPhrase>양은수 님에게</ResultPhrase>
            <ResultPhrase>{normalizeNumber(amount)}원을</ResultPhrase>
            <ResultPhrase>{period}개월 동안 매달 보낼게요</ResultPhrase>
          </ResultWrapper>
        </CompleteContainer>
      )}
      <S.ButtonWrapper>
        <S.BottomBtn onClick={handleNext}>{step === 0 ? "다음" : "보내기"}</S.BottomBtn>
      </S.ButtonWrapper>
    </S.Container>
  );
};

export default Registration;

const StepWrapper = styled.div`
  ${tw`flex flex-col gap-10`}
`;

const StyledInputWrapper = styled.div`
  background-color: #e9f2ff;
  padding: 7px 20px;
  border-radius: 15px;
  width: 100%;
  margin-bottom: 10px;
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  width: calc(100% - 45px);
  height: 56px;
  font-size: 18px;
  border: none;
  background: transparent;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #c9c9c9;
  }
`;

const StyledUnit = styled.span`
  ${tw`text-lg`}
  margin-left: 10px;
`;

const Error = styled.div`
  ${tw`text-red-500`}
  position: absolute;
  right: 30px;
`;

const ResultWrapper = styled.div`
  ${tw`flex flex-col justify-center items-center gap-1`}
  height: calc(100vh - 200px);
`;

const ResultPhrase = styled.div`
  ${tw`text-3xl font-bold text-center`}
`;

const CompleteContainer = styled.div`
  ${tw`flex flex-col items-center gap-2`}
`;
