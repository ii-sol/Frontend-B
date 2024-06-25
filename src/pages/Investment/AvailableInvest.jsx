import React, { useEffect, useState } from "react";
import * as S from "../../styles/GlobalStyles";
import tw from "twin.macro";
import Header from "../../components/Investment/Header";
import { styled } from "styled-components";
import { BottomSheet } from "react-spring-bottom-sheet";
import StocksDetail from "../../components/Investment/StocksDetail";
import "react-spring-bottom-sheet/dist/style.css";
import EmptyImage from "~/assets/img/common/empty.svg";
import StockItem from "../../components/Investment/StockItem";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setName,
  setCode,
  setIsNew,
  fetchMyStocks,
} from "../../store/reducers/Invest/invest";

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
      {tradableStockList.length === 0 ? (
        <EmptyState>
          <Img src={EmptyImage} alt="No data" />
          <EmptyText>거래 가능 종목이 없어요</EmptyText>
        </EmptyState>
      ) : (
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
      )}

      <S.BottomBtn
        onClick={() => {
          navigate("/invest/stocklist");
        }}
      >
        거래 가능 종목 추가하기
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

const EmptyState = styled.div`
  ${tw`flex flex-col items-center justify-center h-full mt-20`}
`;

const Img = styled.img`
  ${tw`h-auto mb-4`}
  width: 40%;
`;

const EmptyText = styled.div`
  ${tw`text-2xl`}
`;
