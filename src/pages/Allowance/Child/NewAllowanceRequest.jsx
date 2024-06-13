import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import { styled } from "styled-components";

import Header from "~/components/common/Header";
import Button from "~/components/common/Button";
import Member from "~/components/common/Member";
import Message from "~/components/common/Message";

import ChildImage from "~/assets/img/Auth/child.svg";

import MessageImage from "~/assets/img/common/message.svg";
import AllowanceImage from "~/assets/img/Allowance/allowance.svg";
import KeypadInput from "../../../components/Allowance/KeypadInput";

const NewAllowanceRequest = () => {
  const [step, setStep] = useState(0);
  const [displayedNumber, setDisplayedNumber] = useState("0");
  const [message, setMessage] = useState("");
  const [requestData, setRequestData] = useState({
    childPhone: "",
    parentPhone: "",
    amount: "",
    content: "",
  });

  const navigate = useNavigate();

  const today = new Date();
  const dueDate = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000);

  const year = dueDate.getFullYear();
  const month = (dueDate.getMonth() + 1).toString().padStart(2, "0");
  const day = dueDate.getDate().toString().padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  const handleNext = () => {
    let error = "";

    switch (step) {
      case 0:
        if (!requestData.parentPhone) {
          error = "부모님을 선택해주세요!";
        }
        break;
      case 1:
        if (isDisplayedNumberZero()) {
          error = "금액을 입력해주세요!";
        } else {
          setRequestData({
            ...requestData,
            amount: parseInt(displayedNumber),
          });
          setStep(step + 1);
        }
        break;
      case 2:
        if (!requestData.content) {
          error = "메세지를 입력해주세요!";
        } else {
          setRequestData({
            ...requestData,
            content: message,
          });
        }
        break;
      default:
        break;
    }

    if (error) {
      alert(error);
    } else {
      setStep(step + 1);
    }
  };

  const handleMemberChange = (name, phoneNum) => {
    setRequestData({
      ...requestData,
      parentName: name,
      parentPhone: phoneNum,
    });
  };

  const isDisplayedNumberZero = () => displayedNumber === "0";

  const handleInputChange = (message) => {
    setMessage(message);
    setRequestData({
      ...requestData,
      content: message,
    });
  };

  const handleAllowanceRedirect = () => {
    console.log(requestData);
    navigate("/allowance/irregular");
  };

  return (
    <Container>
      <Header left={"<"} title={"용돈 조르기"} right={"취소"} />
      <FormWrapper>
        {step === 0 && (
          <StepWrapper>
            <Phrase>누구에게 용돈을 부탁드릴까요?</Phrase>
            <MemberContainer>
              <Member img={ChildImage} name="박지민" role="부모" phoneNum="010-0000-0000" onClick={() => handleMemberChange("박지민", "010-0000-0000")}></Member>
              <Member img={ChildImage} name="엄마"></Member>
              <Member img={ChildImage} name="아빠" role="부모" phoneNum="010-4321-4321" onClick={() => handleMemberChange("아빠", "010-4321-4321")}></Member>
            </MemberContainer>
          </StepWrapper>
        )}
        {step === 1 && (
          <StepWrapper>
            <Phrase>얼마를 달라고 부탁드릴까요?</Phrase>
            <KeypadInput displayedNumber={displayedNumber} setDisplayedNumber={setDisplayedNumber} />
          </StepWrapper>
        )}
        {step === 2 && (
          <StepWrapper>
            <Summary>
              <Phrase tw="m-0">{requestData.parentName} 님에게</Phrase>
              <Phrase tw="m-0">{requestData.amount}원을 부탁드릴게요</Phrase>
              <SmallPhrase>용돈이 필요한 이유를 작성해주세요!</SmallPhrase>
            </Summary>
            <InputContainer>
              <Img src={MessageImage} alt="메세지" />
              <Message placeholder="합리적인 이유를 적어주세요!" maxLength="20" onChange={handleInputChange} value={requestData.content}></Message>
            </InputContainer>
          </StepWrapper>
        )}
        {step === 3 && (
          <StepWrapper>
            <CompleteContainer>
              <Img src={AllowanceImage} alt="완료" />
              <Phrase>용돈 조르기 완료</Phrase>
              <CompleteCard>
                <div>{requestData.parentName}</div>
                <div tw="text-[#154B9B]">{requestData.amount}</div>
              </CompleteCard>
              <div tw="text-xs">
                <span tw="text-[#154B9B]">{formattedDate}</span>까지 응답하지 않으면 취소돼요.
              </div>
            </CompleteContainer>
          </StepWrapper>
        )}

        <ButtonWrapper>
          {step < 3 ? (
            <Button onClick={handleNext} text="다음">
              다음
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

export default NewAllowanceRequest;

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
  ${`flex
  justify-between
  mt-4`}
`;

const Summary = tw.div`
  m-5
`;

const Phrase = tw.div`
  flex
  text-xl
  font-bold
  justify-center
  m-5
`;

const SmallPhrase = tw.div`
  flex
  text-sm
  font-medium
  justify-center
`;

const MemberContainer = styled.div`
  ${tw`
    flex
    flex-col
    gap-3
  `}
`;

const Img = styled.img`
  width: 143px;
  height: auto;
  margin-bottom: 16px;
  // box-shadow: 0px 0px 80px 0px rgba(151, 178, 221, 0.4);
`;

const InputContainer = styled.div`
  ${tw`flex flex-col gap-5 items-center`}
  font-size: 18px;
`;

const Amount = styled.div`
  width: ${(props) => (props.displayedNumber && props.displayedNumber.length > 0 ? "auto" : "123px")}
  height: 49px;
  background: #f5f5f5;
  padding: 10px;
  border-radius: 15px;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const CompleteContainer = tw.div`
  flex
  flex-col
  items-center
  my-20
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
  gap: 16px;
  padding: 20px;
`;
