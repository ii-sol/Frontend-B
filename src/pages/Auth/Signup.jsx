import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import { styled } from "styled-components";

import Button from "~/components/common/Button";
import ChatBubble from "~/components/Auth/ChatBubble";
import Input from "~/components/Auth/Input";

import ChildImage from "~/assets/img/Auth/child.svg";
import ParentImage from "~/assets/img/Auth/parent.svg";
import CompleteImage from "~/assets/img/Auth/complete.svg";

const Signup = () => {
  const [step, setStep] = useState(0);
  const [userData, setUserData] = useState({
    name: "",
    phoneNum: "",
    accountInfo: "",
    birthDate: "",
    role: "",
  });
  const [showconfirmAccountInfo, setShowconfirmAccountInfo] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "confirmAccountInfo") {
      setShowconfirmAccountInfo(true);
    }

    // if (e.target.name === "birthDate") {
    //   const formattedValue = e.target.value.replaceAll("-", "");
    //   setUserData({
    //     ...userData,
    //     [e.target.name]: formattedValue,
    //   });
    // } else {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
    // }
  };

  const handleRoleChange = (role) => {
    setUserData({
      ...userData,
      role: role,
    });
  };

  const handleNext = () => {
    let error = "";
    if (step === 0 && !isNameValid(userData.name)) {
      error = "이름은 2~5글자 이내의 한글로 입력해주세요.";
    } else if (step === 1 && !isPhoneNumValid(userData.phoneNum)) {
      // TODO: 이미 존재하는 전화번호인지도 확인
      error = "전화번호는 010-XXXX-XXXX 형식으로 입력해주세요.";
    } else if (step === 2) {
      if (!isPasswordValid(userData.accountInfo)) {
        error = "비밀번호는 6자리 숫자로 입력해주세요.";
      } else if (showconfirmAccountInfo && userData.accountInfo !== userData.confirmAccountInfo) {
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

  const handleSubmit = () => {
    let error = "";
    if (step === 4 && !userData.role) {
      error = "역할을 선택해주세요.";
    }

    if (error) {
      if (step === 4 && !userData.role) {
        setErrorMessage(error);
      }
    } else {
      console.log(userData);
      // TODO: 폼 제출 로직 추가
      setStep(5);
    }
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
                  <Input type="password" name="confirmAccountInfo" value={userData.confirmAccountInfo} onChange={handleChange} />
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
          <StepWrapper tw="justify-center mb-40">
            <Phrase>어떤 서비스를 이용하고 싶으신가요?</Phrase>
            <ButtonGroup>
              <RoleWrapper>
                <RoleButton role="아이" onClick={() => handleRoleChange(2)}>
                  <img src={ChildImage} alt="아이" />
                </RoleButton>
                아이
              </RoleWrapper>
              <RoleWrapper>
                <RoleButton role="부모" onClick={() => handleRoleChange(1)}>
                  <img src={ParentImage} alt="부모" />
                </RoleButton>
                부모
              </RoleWrapper>
            </ButtonGroup>
            <ErrorWrapper>{errorMessage && <div tw="text-red-500 text-sm">{errorMessage}</div>}</ErrorWrapper>
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
            <Button onClick={handleNext} text="다음">
              다음
            </Button>
          ) : step === 4 ? (
            <Button onClick={handleSubmit} text="제출">
              제출
            </Button>
          ) : (
            step === 5 && (
              <Button onClick={handleLoginRedirect} text="로그인 하러 가기">
                로그인 하러 가기
              </Button>
            )
          )}
        </ButtonWrapper>
      </FormWrapper>
    </Container>
  );
};

export default Signup;

const Container = tw.div`
  flex
  justify-center
  h-screen
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

const ButtonGroup = tw.div`
  flex
  gap-9
  justify-center
`;

const RoleWrapper = tw.div`
  flex
  flex-col
  gap-2
  items-center
  justify-center
`;

const RoleButton = styled.button`
  ${tw`w-28 h-[120px] rounded-[15px]`}
  ${({ role }) => (role === "아이" ? tw`bg-[#FFCE70] opacity-50` : tw`bg-[#70D4FF] opacity-50`)}
  &:hover {
    ${tw`opacity-80`}
  }
`;

const CompleteWrapper = tw.div`
  flex
  flex-col
  gap-2
  items-center
  justify-center
`;

const ErrorWrapper = tw.div`
  flex
  flex-col
  items-center
  mt-5
`;

const ErrorMessage = tw.div`
  self-end 
  mb-10
  text-red-500
  text-sm
  text-right
  mt-2
`;
