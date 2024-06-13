import React, { useState } from "react";
import * as S from "../../../styles/GlobalStyles";
import Header from "../../../components/Investment/Header";
import { styled } from "styled-components";
import { BottomSheet } from "react-spring-bottom-sheet";
import StocksDetail from "../../../components/Investment/StocksDetail";
import "react-spring-bottom-sheet/dist/style.css";
import StockItem from "../../../components/Investment/StockItem";
import { useLocation, useNavigate } from "react-router-dom";
import { MdModeEditOutline } from "react-icons/md";

const AvailableInvest = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [open, setOpen] = useState(false);
  const [selectedStockId, setSelectedStockId] = useState(null);

  const handleDismiss = () => {
    setOpen(false);
  };

  const data = [
    { id: 0, title: "삼성전자", price: "1521000원", change: -152721 },
    { id: 1, title: "LG전자", price: "123000원", change: 2721 },
    { id: 2, title: "SK하이닉스", price: "950000원", change: -50000 },
    { id: 3, title: "현대차", price: "210000원", change: 5000 },
  ];

  return (
    <S.Container>
      <Header />
      <Wrapper>
        <TitleDiv>거래 가능 종목 리스트</TitleDiv>
        <Div onClick={() => navigate("/invest/stocklist")}>
          <MdModeEditOutline />
        </Div>
      </Wrapper>
      <Box>
        {data.map((stock) => (
          <StockItem
            key={stock.id}
            stock={stock}
            setOpen={setOpen}
            setSelectedStockId={setSelectedStockId}
          />
        ))}
      </Box>
      <S.BottomBtn onClick={() => navigate("/invest/stocklist")}>
        새 종목 추가하기
      </S.BottomBtn>

      <BottomSheet open={open} onDismiss={handleDismiss}>
        <StocksDetail
          selectedStockId={selectedStockId}
          accountNum={state.accountNum}
        />
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
