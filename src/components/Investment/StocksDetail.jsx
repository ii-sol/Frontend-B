import React, { useState, useEffect } from "react";
import * as S from "../../styles/GlobalStyles";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import Indicator from "./Indicator";
import CandleChart from "./CandleChart";
import { useDispatch, useSelector } from "react-redux";
import { setTrade } from "../../store/reducers/Invest/invest";
import Chart from "./Chart";
import { normalizeNumber } from "../../utils/normalizeNumber";

const StocksDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const code = useSelector((state) => state.invest.code);
  const name = useSelector((state) => state.invest.name);
  const price = useSelector((state) => state.invest.price);
  const changePrice = useSelector((state) => state.invest.changePrice);
  const changeRate = useSelector((state) => state.invest.changeRate);
  const changeSign = useSelector((state) => state.invest.changeSign);

  console.log(changeSign);

  const getChangeInfo = () => {
    switch (changeSign) {
      case "1":
      case "2":
        return {
          sign: "▲",
          sign2: "+",
          color: "#FF5959",
        };
      case "3":
        return {
          sign: "",
          sign2: "",
          color: "#000000",
        };
      case "4":
      case "5":
        return {
          sign: "▼",
          sign2: "",
          color: "#5987ff",
        };
      default:
        return {
          sign: "",
          sign2: "",
          color: "#000000",
        };
    }
  };

  const { sign, sign2, color } = getChangeInfo();

  return (
    <Container>
      <RowDiv>
        <HeaderDiv>
          <StockDiv>{name}</StockDiv>
          <S.ColumnDiv style={{ color: color }}>
            <PriceDiv style={{ color: color }}>
              {normalizeNumber(price)}원
            </PriceDiv>
            <PriceDiv>
              {sign}
              {normalizeNumber(changePrice)} {sign2}
              {changeRate}%
            </PriceDiv>
          </S.ColumnDiv>
        </HeaderDiv>
      </RowDiv>
      <Chart />
      <InfoDiv>투자 지표</InfoDiv>
      <Indicator />
      <RowDiv $center="center" $top="20" $gap="20">
        <S.BuyBtn
          $background="#FF5959"
          onClick={() => {
            navigate("/invest/trading");
            dispatch(setTrade(0));
          }}
        >
          구매하기
        </S.BuyBtn>
        <S.BuyBtn
          $background="#5987ff"
          onClick={() => {
            navigate("/invest/trading");
            dispatch(setTrade(1));
          }}
        >
          판매하기
        </S.BuyBtn>
      </RowDiv>
    </Container>
  );
};

export default StocksDetail;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  padding-bottom: 15px;
`;

const RowDiv = styled.div`
  display: flex;
  justify-content: ${(props) =>
    props.$center ? props.$center : "space-between"};
  align-items: center;
  margin-top: ${(props) => (props.$top ? props.$top : "10")}px;
  gap: ${(props) => (props.$gap ? props.$gap : "10")}px;
`;

const HeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const PriceDiv = styled.div`
  text-align: right;
`;

const StockDiv = styled.div`
  font-size: 25px;
`;

const InfoDiv = styled.div`
  text-align: left;
  font-size: 20px;
`;
