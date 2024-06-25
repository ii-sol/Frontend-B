import React, { useState, useEffect } from "react";
import * as S from "../../styles/GlobalStyles";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import Indicator from "./Indicator";
import CandleChart from "./CandleChart";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMyStocks,
  fetchStock,
  postMyStocks,
  setIsNew,
  setTrade,
} from "../../store/reducers/Invest/invest";
import Chart from "./Chart";
import { normalizeNumber } from "../../utils/normalizeNumber";

const StocksDetail = ({ onDismiss }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOwnedStock, setIsOwnedStock] = useState(null);
  const code = useSelector((state) => state.invest.code);
  const name = useSelector((state) => state.invest.name);
  const price = useSelector((state) => state.invest.price);
  const changePrice = useSelector((state) => state.invest.changePrice);
  const changeRate = useSelector((state) => state.invest.changeRate);
  const changeSign = useSelector((state) => state.invest.changeSign);
  const tradableStockList = useSelector(
    (state) => state.invest.tradableStockList
  );
  const isMyStock = useSelector((state) => state.invest.isMyStock);

  const isNew = useSelector((state) => state.invest.isNew);
  const selectedChildSn = useSelector((state) => state.user.selectedChildSn);

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

  useEffect(() => {
    setIsOwnedStock(isMyStock.includes(code));
    console.log("is", isOwnedStock);
  }, [isMyStock, tradableStockList, code, isOwnedStock]);

  return (
    <Container>
      <RowDiv>
        <HeaderDiv>
          <StockDiv>{name}</StockDiv>
          <S.ColumnDiv style={{ color: color }}>
            <PriceDiv>{normalizeNumber(price)}원</PriceDiv>
            <PriceDiv>
              {sign}
              {normalizeNumber(changePrice)} {sign2}
              {parseFloat(changeRate).toFixed(2)}%
            </PriceDiv>
          </S.ColumnDiv>
        </HeaderDiv>
      </RowDiv>
      <Chart />
      <InfoDiv>투자 지표</InfoDiv>
      <Indicator />
      <RowDiv $center="center" $top="20" $gap="20">
        <Btn
          onClick={() => {
            !isOwnedStock
              ? dispatch(postMyStocks({ csn: selectedChildSn, ticker: code }))
              : dispatch(
                  deleteMyStocks({ csn: selectedChildSn, ticker: code })
                );
            onDismiss();
          }}
        >
          {!isOwnedStock
            ? "거래 가능 종목에 추가하기"
            : "거래 가능 종목에서 삭제하기"}
        </Btn>
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
  justify-content: ${(props) => (props.$center ? props.$center : "space-between")};
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

const Btn = styled.button`
  width: 90%;
  background-color: #cde1ff;
  color: #154b9b;
  border-radius: 15px;
  height: 48px;
  font-size: 20px;
  font-weight: 600;
`;
