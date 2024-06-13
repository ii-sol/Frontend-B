import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

const Account = ({ accountNum }) => {
  const navigate = useNavigate();
  const name = "프디아";
  const account = "010-1234-1234-01";
  const accountType = "용돈";
  const balance = 15000;

  const theme = {
    accountNum,
  };

  return (
    <ThemeProvider theme={theme}>
      <AccountContainer>
        <InfoWrapper>
          <InfoDiv>
            {name}님의 {accountType}계좌
          </InfoDiv>
          <AccountDiv>{account}</AccountDiv>
        </InfoWrapper>
        <BalanceDiv>{balance}원</BalanceDiv>
        <ButtonWrapper>
          {accountNum === 1 ? (
            <>
              <Btn>돈 보내기</Btn>
              <Btn>용돈 내역</Btn>
            </>
          ) : (
            <>
              <Btn
                onClick={() =>
                  navigate("/invest/start", {
                    state: { accountNum: accountNum },
                  })
                }
              >
                투자하기
              </Btn>
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
    theme.accountNum === 1
      ? "#FAFAFA"
      : theme.accountNum === 2
      ? "#FFE6F1"
      : theme.accountNum === 3
      ? "#FFF4BD"
      : "#fafafa"};
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
  justify-content: ${({ theme }) =>
    theme.accountNum === 1 ? "center" : "flex-end"};
  gap: 30px;
`;

const Btn = styled.button`
  width: 120px;
  height: 45px;
  border-radius: 15px;
  border: none;
  background: ${({ theme }) =>
    theme.accountNum === 1
      ? "#EFEFEF"
      : theme.accountNum === 2
      ? "#FFC4DE"
      : theme.accountNum === 3
      ? "#FFDD86"
      : "#F2F2F2"};
  font-size: 18px;
`;
