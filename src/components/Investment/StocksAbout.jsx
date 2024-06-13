import React from "react";
import * as S from "../../styles/GlobalStyles";
import { styled } from "styled-components";

const StocksAbout = () => {
  return (
    <Container>
      <RowDiv>
        <InfoDiv>종목</InfoDiv>
        <InfoDiv>LG</InfoDiv>
      </RowDiv>
      <RowDiv>
        <InfoDiv>시장가</InfoDiv>
        <InfoDiv>80,000원</InfoDiv>
      </RowDiv>
      <RowDiv>
        <InfoDiv>보유잔고</InfoDiv>
        <InfoDiv>200,000원</InfoDiv>
      </RowDiv>
      <RowDiv>
        <InfoDiv>주문가능수량</InfoDiv>
        <InfoDiv>최대 3주</InfoDiv>
      </RowDiv>
    </Container>
  );
};

export default StocksAbout;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid #cde1ff;
  padding: 20px;
  border-radius: 5px;
`;

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: #0974b1;
  font-size: 16px;
`;

const InfoDiv = styled.div``;
