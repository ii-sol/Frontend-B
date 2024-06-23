import React, { useState } from "react";
import * as S from "../../styles/GlobalStyles";
import Header from "../../components/Investment/Header";
import { styled } from "styled-components";
import { BottomSheet } from "react-spring-bottom-sheet";
import StocksDetail from "../../components/Investment/StocksDetail";
import "react-spring-bottom-sheet/dist/style.css";
import StockItem from "../../components/Investment/StockItem";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setName, setCode, setIsNew } from "../../store/reducers/Invest/invest";

// TODO: 관심종목 유무로 isNew 구분하기
const AvailableInvest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleDismiss = () => {
    setOpen(false);
  };

  const data = [
    {
      id: 0,
      name: "삼성전자",
      price: "1521000원",
      change: -152721,
      code: "005930",
    },
    { id: 1, name: "LG전자", price: "123000원", change: 2721, code: "066570" },
    {
      id: 2,
      name: "SK하이닉스",
      price: "950000원",
      change: -50000,
      code: "000660",
    },
    { id: 3, name: "현대차", price: "210000원", change: 5000, code: "005380" },
  ];

  const onClick = (stock) => {
    dispatch(setCode(stock.code));
    dispatch(setIsNew(false));
    console.log(stock);
  };

  return (
    <S.Container>
      <Header />
      <Wrapper>
        <TitleDiv>거래 가능 종목 리스트</TitleDiv>
      </Wrapper>
      <Box>
        {data.map((stock) => (
          <StockItem
            key={stock.id}
            stock={stock}
            setOpen={setOpen}
            onClick={() => onClick(stock)}
          />
        ))}
      </Box>
      <S.BottomBtn
        onClick={() => {
          navigate("/invest/stocklist");
          dispatch(setIsNew(true));
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
