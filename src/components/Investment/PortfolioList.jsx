import React from "react";
import styled from "styled-components";
import * as S from "../../styles/GlobalStyles";

const PortfolioList = ({ toggleShow, height }) => {
  return (
    <Container $height={height}>
      <ColumnDiv>
        <InfoDiv>My증권계좌 포트폴리오</InfoDiv>
        <SwitchBtn onClick={toggleShow}>그래프 보기</SwitchBtn>
        <Box $height={height}>
          <Wrapper>
            <StockDiv>
              <StockName>삼성전자</StockName>
              <StockQuantity>1주</StockQuantity>
            </StockDiv>
            <HoldingDiv>
              <EvaluationAmount>1521000원</EvaluationAmount>
              <RowDiv>
                <Profit>- 152,721</Profit>
                <Profit>&nbsp;(0.5%)</Profit>
              </RowDiv>
            </HoldingDiv>
          </Wrapper>
        </Box>
      </ColumnDiv>
    </Container>
  );
};

export default PortfolioList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  height: ${(props) => props.$height}px;
  background-color: #ebf5ff;
  border-radius: 15px;
`;

const ColumnDiv = styled.div`
  position: relative;
  width: 330px;
  display: flex;
  flex-direction: column;
  padding: 30px 20px;
`;

const InfoDiv = styled.div`
  font-size: 17px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  margin-top: 20px;
  height: ${(props) => props.$height - 70}px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #dceeff;
  border-radius: 15px;
  padding: 15px;
  height: 80px;
  margin-top: 10px;
`;

const StockDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 1;
`;

const StockName = styled.div`
  font-size: 20px;
`;

const StockQuantity = styled.div`
  font-size: 17px;
`;

const HoldingDiv = styled.div`
  display: flex;
  flex-direction: column;
  color: #154b9b;
  gap: 5px;
  flex: 1;
  text-align: right;
`;

const EvaluationAmount = styled.div`
  font-size: 20px;
`;

const RowDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Profit = styled.div`
  font-size: 17px;
  text-align: right;
`;

const SwitchBtn = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  border-radius: 15px;
  background: #c5dbff;
  width: 100px;
  height: 40px;

  font-size: 15px;
`;
