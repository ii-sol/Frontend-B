import React, { useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import tw from "twin.macro";

import Button from "~/components/common/Button";

const Login = () => {
  const [phoneNum, setPhoneNum] = useState("");

  const login = () => {
    // TODO: 로그인 하기
    console.log("로그인");
  };

  const handlePhoneChange = (e) => {
    const formattedValue = e.target.value.replace(/[^0-9]/g, "").replace(/(^02.{0}|^01.{1}|[0-9]{3,4})([0-9]{3,4})([0-9]{4})/g, "$1-$2-$3");
    setPhoneNum(formattedValue);
  };

  return (
    <Layout>
      <div tw="text-2xl font-bold">iSOL{/* TODO: 로고 넣기 */}</div>
      <LoginForm>
        <LoginWrapper>
          <div>전화번호</div>
        </LoginWrapper>
        <Input type="text" name="phoneNum" value={phoneNum} onChange={handlePhoneChange} placeholder="전화번호를 입력해주세요" maxlength="13" />
        <LoginWrapper>
          <div>비밀번호</div>
        </LoginWrapper>
        <Input type="password" name="accountInfo" placeholder="비밀번호를 입력해주세요"></Input>
      </LoginForm>
      <StyledLink to="/signup">회원이 아니신가요?</StyledLink>
      <Button text="로그인" onClick={login}></Button>
    </Layout>
  );
};

export default Login;

const Layout = tw.div`
  flex 
  flex-col 
  items-center 
  justify-center 
  h-screen
  gap-4
`;

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  height: 248px;
  padding: 20px;
  background-color: #f4f9ff;
  border-radius: 15px;
`;

const LoginWrapper = tw.div`
  flex
  flex-row
  gap-3
  px-1
  text-sm
  font-medium
`;

const Input = tw.input`
  text-base
  rounded-[15px]
  p-3
  my-2
`;

const StyledLink = tw(Link)`
  text-sm 
  text-[#5055C6] 
  text-right 
  mb-4
  no-underline
`;
