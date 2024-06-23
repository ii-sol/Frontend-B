import React, { useState } from "react";
import StocksAbout from "../../components/Investment/StocksAbout";
import Header from "../../components/Investment/Header";
import Keypad from "../../components/common/Keypad";
import { styled } from "styled-components";
import * as S from "../../styles/GlobalStyles";
import { useNavigate } from "react-router-dom";

import { normalizeNumber } from "../../utils/normalizeNumber";
import { useDispatch, useSelector } from "react-redux";
import { setMyAmount, setQuantity } from "../../store/reducers/Invest/invest";

//TODO: 매수주문증거금이 부족합니다. alert, 0주는 안됨
const Trading = () => {
  const dispatch = useDispatch();
  const isNew = useSelector((state) => state.invest.isNew);
  const trade = useSelector((state) => state.invest.trade);
  const price = useSelector((state) => state.invest.price);
  const navigate = useNavigate();
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

  const getOrderAmount = () => {
    const orderQuantity = parseInt(displayedNumber, 10);
    return orderQuantity * price;
  };

  const onTrade = () => {
    if (isNew) {
      navigate("/invest/member");
      dispatch(setQuantity(parseInt(displayedNumber, 10)));
      dispatch(setMyAmount(getOrderAmount()));
    } else {
      navigate("/invest/send");
      dispatch(setQuantity(parseInt(displayedNumber, 10)));
      dispatch(setMyAmount(getOrderAmount()));
    }
  };

  return (
    <div>
      <Header type="none" />
      <StocksAbout />
      <ColumDiv>
        {trade === 0 ? (
          <InfoDiv>얼마나 살까요?</InfoDiv>
        ) : (
          <InfoDiv>얼마나 팔까요?</InfoDiv>
        )}
        <Amount>
          {normalizeNumber(displayedNumber)} <span>주</span>
        </Amount>
        <Div>주문금액 {normalizeNumber(getOrderAmount())}원</Div>
        <Keypad
          onNumberClick={handleNumberClick}
          onBackspace={handleBackspace}
        />
        {trade === 0 ? (
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
  margin-top: 10px;
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
  padding: 10px;
  border: 1px solid #accdff;
  border-radius: 15px;
  font-size: 18px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  text-align: right;
`;

const Div = styled.div`
  font-size: 20px;
  margin: 10px 0px 10px auto;
  color: #707070;
  font-size: 18px;
`;
