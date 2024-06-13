import React, { useEffect, useState } from "react";
import StocksAbout from "../../../components/Investment/StocksAbout";
import Header from "../../../components/Investment/Header";
import Keypad from "../../../components/common/Keypad";
import { styled } from "styled-components";
import * as S from "../../../styles/GlobalStyles";
import { useLocation, useNavigate } from "react-router-dom";

//TODO: 매수주문증거금이 부족합니다. alert
const Trading = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  console.log(state);
  const [displayedNumber, setDisplayedNumber] = useState("0");
  const handleNumberClick = (number) => {
    if (displayedNumber.length < 7) {
      setDisplayedNumber((prevNumber) => prevNumber + number);
    }
  };

  const handleBackspace = () => {
    if (displayedNumber.length > 1) {
      setDisplayedNumber((prevNumber) => prevNumber.slice(0, -1));
    }
  };

  const normalizeNumber = (number) => {
    return parseFloat(number).toLocaleString("en-US");
  };

  // TODO: 계좌 확인, 매수매도 확인
  const onTrade = () => {
    if (state.accountNum === 3) {
      navigate("/invest/member", {
        state: {
          type: "투자",
          data: {
            trade: state.trade,
            stockName: "삼성전자",
            quantity: normalizeNumber(displayedNumber),
            price: "12,300",
          },
        },
      });
    } else {
      // 완료페이지
      navigate("/invest/send", {
        state: {
          type: "trade",
          data: {
            stockName: "삼성전자",
            quantity: normalizeNumber(displayedNumber),
            trade: state.trade,
            price: "12,300",
          },
        },
      });
    }
  };

  return (
    <div>
      <Header type="none" />
      <StocksAbout />
      <ColumDiv>
        {state.trade === "buy" ? (
          <InfoDiv>얼마나 살까요?</InfoDiv>
        ) : (
          <InfoDiv>얼마나 팔까요?</InfoDiv>
        )}
        <Amount>
          {normalizeNumber(displayedNumber)} <span>주</span>
        </Amount>
        <Div>주문금액 52,425원</Div>
        <Keypad
          onNumberClick={handleNumberClick}
          onBackspace={handleBackspace}
        />
        {state.trade === "buy" ? (
          <S.BuyBtn $background="#FF5959" onClick={() => onTrade()}>
            구매하기
          </S.BuyBtn>
        ) : (
          <S.BuyBtn $background="#5987ff" onClick={() => onTrade()}>
            판매하기
          </S.BuyBtn>
        )}
      </ColumDiv>
    </div>
  );
};

export default Trading;

const ColumDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const InfoDiv = styled.div`
  color: #000000;
  font-size: 22px;
  text-align: center;
  margin: 10px auto;
`;

const InputDiv = styled.div`
  position: relative;
`;

const Input = styled.input`
  background-color: #f5f5f5;
  width: 120px;
  height: 40px;
  border-radius: 100px;
  padding-right: 40px;

  font-size: 20px;
`;

const Amount = styled.div`
  position: relative;
  width: 105px;
  height: 49px;
  background: #f5f5f5;
  padding: 10px;
  border-radius: 15px;
  font-size: 18px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  text-align: right;
`;

const Div = styled.div`
  font-size: 20px;
  margin-left: auto;
  margin-bottom: 10px;
  color: #707070;
  font-size: 18px;
`;
