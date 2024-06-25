import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import tw from "twin.macro";
import styled from "styled-components";
import * as S from "../../styles/GlobalStyles";
import { fetchUserInfo } from "../../services/user";
import { updateRegularAllowance } from "../../services/allowance";
import { useSelector, useDispatch } from "react-redux";

import { normalizeNumber } from "../../utils/normalizeNumber";

import Header from "~/components/common/Header";

const Update = () => {
  const [step, setStep] = useState(0);
  const [amount, setAmount] = useState("");
  const [period, setPeriod] = useState("");
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const [allowanceDate, setAllowanceDate] = useState("");
  const [requestData, setRequestData] = useState({
    childSerialNumber: 0,
    amount: 0,
    period: 0,
    idBeforeChange: 0,
    dateBeforeChange: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;

  const selectedChildSn = useSelector((state) => state.user.selectedChildSn);
  const selectedChildName = useSelector((state) => state.user.selectedChildName);

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    setAllowanceDate(tomorrow.getDate());
  }, [selectedChildSn]);

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
      setStep(1);
    } else {
      navigate("/allowance");
    }
  };

  const handleSubmit = async () => {
    try {
      await updateRegularAllowance(allowanceId, {
        //TODO: allowanceId 어떻게 가져옴?
        amount: parseInt(amount),
        period: parseInt(period),
      });
      alert("정기 용돈이 성공적으로 변경되었습니다.");
      navigate("/allowance");
    } catch (error) {
      console.error("Error creating regular allowance:", error);
      alert("정기 용돈 변경 중 오류가 발생했습니다. 다시 시도해주세요.");
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
            <ResultPhrase>
              <span tw="text-blue-800">{normalizeNumber(amount)}원</span>을
            </ResultPhrase>
            <ResultPhrase>
              <span tw="text-blue-800">{period}개월</span> 동안 매달 보낼게요
            </ResultPhrase>
            <S.Phrase tw="mb-0">내일 1시에 첫 용돈이 보내집니다.</S.Phrase>
            <S.Phrase tw="m-0">
              매달 <span tw="text-blue-600">{allowanceDate}일</span>에 자동 이체됩니다.
            </S.Phrase>
          </ResultWrapper>
        </CompleteContainer>
      )}
      <S.ButtonWrapper>{step === 0 ? <S.BottomBtn onClick={handleNext}>다음</S.BottomBtn> : <S.BottomBtn onClick={handleSubmit}>보내기</S.BottomBtn>}</S.ButtonWrapper>
    </S.Container>
  );
};

export default Update;

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
