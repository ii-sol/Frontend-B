import React, { useEffect, useState } from "react";
import * as S from "../../styles/GlobalStyles";
import Header from "../../components/Investment/Header";
import { styled } from "styled-components";
import { BottomSheet } from "react-spring-bottom-sheet";
import StocksDetail from "../../components/Investment/StocksDetail";
import "react-spring-bottom-sheet/dist/style.css";
import StockItem from "../../components/Investment/StockItem";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setName,
  setCode,
  setIsNew,
  fetchMyStocks,
} from "../../store/reducers/Invest/invest";

//TODO: 없을 때 페이지
const AvailableInvest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedChildSn = useSelector((state) => state.user.selectedChildSn);
  const selectedChildName = useSelector(
    (state) => state.user.selectedChildName
  );
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const tradableStockList = useSelector(
    (state) => state.invest.tradableStockList
  );

  const handleDismiss = () => {
    setOpen(false);
  };

  const onClick = (stock) => {
    dispatch(setCode(stock.code));
    console.log(stock);
  };

  useEffect(() => {
    dispatch(fetchMyStocks({ csn: selectedChildSn }));
  }, [tradableStockList.length]);

  console.log("dd", data);

  return (
    <S.Container>
      <Header />
      <Wrapper>
        <TitleDiv>{selectedChildName}의 거래 가능 종목 리스트</TitleDiv>
      </Wrapper>
      <Box>
        {tradableStockList.map((stock) => (
          <StockItem
            key={stock.ticker}
            stock={stock}
            setOpen={setOpen}
            onClick={() => onClick(stock)}
          />
        ))}
      </Box>
      <S.BottomBtn
        onClick={() => {
          navigate("/invest/stocklist");
        }}
      >
        다른 종목 투자하기
      </S.BottomBtn>
      <BottomSheet open={open} onDismiss={handleDismiss}>
        <StocksDetail />
      </BottomSheet>
    </S.Container>
  );
};

export default AvailableInvest;

const Wrapper = styled.div`
  position: relative;
`;

const Div = styled.div`
  position: absolute;
  top: 12px;
  right: 10px;
  font-size: 25px;
`;

const TitleDiv = styled.div`
  font-size: 25px;
  text-align: center;
  margin: 10px auto;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  margin-top: 10px;
  height: ${screen.height - 210}px;
  width: 100%;
  overflow-x: hidden;
`;
