import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import { styled } from "styled-components";
import { join, checkPhoneNum } from "../../services/user";

import * as S from "../../styles/GlobalStyles";

import ChatBubble from "~/components/Auth/ChatBubble";
import Input from "~/components/Auth/Input";
import Profile from "../../components/Auth/Profile";

import CompleteImage from "~/assets/img/common/complete.svg";

const Signup = () => {
  const [step, setStep] = useState(0);
  const [userData, setUserData] = useState({
    name: "",
    phoneNum: "",
    accountInfo: "",
    birthDate: "",
    profileId: 0,
  });
  const [confirmAccountInfo, setConfirmAccountInfo] = useState("");
  const [showconfirmAccountInfo, setShowconfirmAccountInfo] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "confirmAccountInfo") {
      setShowconfirmAccountInfo(true);
      setConfirmAccountInfo(e.target.value);
    } else {
      setUserData({
        ...userData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleNext = async () => {
    let error = "";
    if (step === 0 && !isNameValid(userData.name)) {
      error = "이름은 2~5글자 이내의 한글로 입력해주세요.";
    } else if (step === 1) {
      if (!isPhoneNumValid(userData.phoneNum)) {
        error = "전화번호는 010-XXXX-XXXX 형식으로 입력해주세요.";
      } else {
        try {
          await checkPhoneNum(userData.phoneNum);
        } catch (err) {
          error = "이미 가입된 전화번호입니다.";
        }
      }
    } else if (step === 2) {
      if (!isPasswordValid(userData.accountInfo)) {
        error = "비밀번호는 6자리 숫자로 입력해주세요.";
      } else if (showconfirmAccountInfo && userData.accountInfo !== confirmAccountInfo) {
        error = "비밀번호가 일치하지 않습니다.";
      }
    } else if (step === 3 && !isBirthDateValid(userData.birthDate)) {
      error = "생년월일을 올바르게 입력해주세요.";
    }

    if (error) {
      setErrorMessage(error);
    } else {
      setErrorMessage("");
      if (step === 2 && !showconfirmAccountInfo) {
        setShowconfirmAccountInfo(true);
      } else {
        setStep(step + 1);
      }
    }
  };

  const handleSubmit = async () => {
    if (userData.profileId === 0) {
      alert("프로필 이미지를 선택해주세요.");
    } else {
      try {
        await join(userData);
        setStep(5);
      } catch (error) {
        setErrorMessage(error);
      }
    }
  };

  const handleProfileSelect = (id) => {
    setUserData({
      ...userData,
      profileId: id,
    });
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const isNameValid = (name) => /^[\uAC00-\uD7A3]{2,5}$/.test(name); // 2~5글자 이내의 한글
  const isPasswordValid = (password) => /^[0-9]{6}$/.test(password); // 6자리 숫자
  const isPhoneNumValid = (phoneNum) => /^010-\d{4}-\d{4}$/.test(phoneNum); // 010-0000-0000 형식
  const isBirthDateValid = (birthDate) => birthDate.replaceAll("-", "").length === 8; // YYYYMMDD 형식

  return (
    <Container>
      <FormWrapper>
        {step === 0 && (
          <StepWrapper>
            <ChatBubble text="안녕! 이름이 뭐예요?" />
            <RightAlignedDiv>
              <Input type="text" name="name" value={userData.name} onChange={handleChange} />
            </RightAlignedDiv>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          </StepWrapper>
        )}
        {step === 1 && (
          <StepWrapper>
            <ChatBubble text="전화번호를 알려주세요!" />
            <RightAlignedDiv>
              <Input type="text" name="phoneNum" value={userData.phoneNum} onChange={handleChange} />
            </RightAlignedDiv>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          </StepWrapper>
        )}
        {step === 2 && (
          <StepWrapper>
            <ChatBubble text="비밀번호를 알려주세요!" />
            <RightAlignedDiv tw="mb-10">
              <Input type="password" name="accountInfo" value={userData.accountInfo} onChange={handleChange} disabled={showconfirmAccountInfo} />
            </RightAlignedDiv>
            {showconfirmAccountInfo && (
              <div tw="flex flex-col">
                <ChatBubble text="비밀번호를 한 번 더 알려주세요!" />
                <RightAlignedDiv>
                  <Input type="password" name="confirmAccountInfo" value={confirmAccountInfo} onChange={handleChange} />
                </RightAlignedDiv>
              </div>
            )}
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          </StepWrapper>
        )}
        {step === 3 && (
          <StepWrapper>
            <ChatBubble text="생년월일을 알려주세요!" />
            <RightAlignedDiv>
              <Input type="date" name="birthDate" value={userData.birthDate} onChange={handleChange} width="100px" />
            </RightAlignedDiv>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          </StepWrapper>
        )}
        {step === 4 && (
          <StepWrapper>
            <CompleteWrapper>
              <S.Question>프로필을 선택해주세요!</S.Question>
              <Profile selectedProfileId={userData.profileId} onSelectProfile={handleProfileSelect} />
              {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            </CompleteWrapper>
          </StepWrapper>
        )}
        {step === 5 && (
          <StepWrapper tw="justify-center mb-40">
            <CompleteWrapper>
              <img src={CompleteImage} alt="완료" />
              <Phrase>가입 완료!</Phrase>
            </CompleteWrapper>
          </StepWrapper>
        )}

        <ButtonWrapper>
          {step < 4 ? (
            <S.BottomBtn onClick={handleNext} text="다음">
              다음
            </S.BottomBtn>
          ) : step === 4 ? (
            <S.BottomBtn onClick={handleSubmit} text="제출">
              제출
            </S.BottomBtn>
          ) : (
            step === 5 && (
              <S.BottomBtn onClick={handleLoginRedirect} text="로그인 하러 가기">
                로그인 하러 가기
              </S.BottomBtn>
            )
          )}
        </ButtonWrapper>
      </FormWrapper>
    </Container>
  );
};

export default Signup;

const Container = styled.div`
  ${tw`flex
  justify-center`}
  height: calc(100vh - 60px);
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
  ${tw`flex flex-col flex-grow`}
`;

const RightAlignedDiv = styled.div`
  ${tw`self-end`}
`;

const Phrase = tw.div`
  flex
  text-lg
  font-bold
  justify-center
  m-5
`;

const ButtonWrapper = styled.div`
  ${`flex
  justify-between
  mt-4`}
`;

const CompleteWrapper = styled.div`
  ${tw`flex
  flex-col
  gap-2
  items-center
  justify-center`}
  height: calc(100vh - 200px)
`;

const ErrorMessage = tw.div`
  self-end 
  mb-10
  text-red-500
  text-sm
  text-right
  mt-2
`;
