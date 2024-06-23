import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

const Account = ({ accountNum }) => {
  const navigate = useNavigate();
  const name = "프디아";
  const userInfo = useSelector((state) => state.user.userInfo);
  const account = "010-1234-1234-01";
  const accountType = "용돈";
  const balance = 15000;

  const theme = {
    accountNum,
  };

  return (
    <ThemeProvider theme={theme}>
      <AccountContainer>
        {accountNum === 2 ? (
          <WelcomeDiv>
            지금 바로 <br />
            iSOL 시작하기
          </WelcomeDiv>
        ) : (
          <>
            <InfoWrapper>
              <InfoDiv>
                {name}님의 {accountNum === 0 ? "용돈 계좌" : "투자 계좌"}
              </InfoDiv>
              <AccountDiv>{account}</AccountDiv>
            </InfoWrapper>
            <BalanceDiv>{balance}원</BalanceDiv>
          </>
        )}
        <ButtonWrapper>
          {accountNum === 0 ? (
            <>
              <Btn onClick={() => navigate("/account/select")}>돈 보내기</Btn>
              <Btn onClick={() => navigate("/allowance/history")}>
                계좌 내역
              </Btn>
            </>
          ) : accountNum === 1 ? (
            <>
              <Btn
                onClick={() => navigate("/invest/tradehistory")}
                style={{ marginLeft: "auto" }}
              >
                투자 내역
              </Btn>
            </>
          ) : (
            <>
              <Btn onClick={() => navigate("/login")}>로그인</Btn>
              <Btn onClick={() => navigate("/signup")}>회원가입</Btn>
            </>
          )}
        </ButtonWrapper>
      </AccountContainer>
    </ThemeProvider>
  );
};

export default Account;

const AccountContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 13px;
  background: ${({ theme }) =>
    theme.accountNum === 0
      ? "#ffffff"
      : theme.accountNum === 1
      ? "#FFF4BD"
      : "#ffffff"};
  padding: 20px 26px;
  width: 305px;
  width: 100%;
  max-width: 330px;
  height: 196px;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  @media (min-width: 400px) {
    max-width: 350px;
  }
`;

const WelcomeDiv = styled.div`
  font-size: 25px;
  font-weight: 700;
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: auto;
  float: right;
  gap: 6px;
`;

const InfoDiv = styled.div`
  text-align: left;
`;

const AccountDiv = styled.div`
  text-align: left;
`;

const BalanceDiv = styled.div`
  font-size: 25px;
  margin: 20px auto;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
`;

const Btn = styled.button`
  width: 120px;
  height: 45px;
  border-radius: 15px;
  border: none;
  background: ${({ theme }) =>
    theme.accountNum === 0
      ? "#F1F7FF"
      : theme.accountNum === 1
      ? "#FFDD86"
      : "#CDE0FF"};
  font-size: 18px;
`;
