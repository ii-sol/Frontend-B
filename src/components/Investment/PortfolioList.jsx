import React from "react";
import styled from "styled-components";
import * as S from "../../styles/GlobalStyles";
import { useSelector } from "react-redux";
import { normalizeNumber } from "../../utils/normalizeNumber";

const PortfolioList = ({ toggleShow }) => {
  const investTradeList = useSelector(
    (state) => state.portfolio.investTradeList
  );

  const selectedChildName = useSelector(
    (state) => state.user.selectedChildName
  );

  return (
    <Container>
      <ColumnDiv>
        <InfoDiv>{selectedChildName}의 포트폴리오</InfoDiv>
        <SwitchBtn onClick={toggleShow}>그래프 보기</SwitchBtn>
        <Box>
          {investTradeList.map((trade, index) => (
            <Wrapper
              key={trade.companyName}
              $isPositive={trade.profitAnsLossAmount}
            >
              <StockDiv>
                <StockName>{trade.companyName}</StockName>
                <StockQuantity>{trade.quantity}주</StockQuantity>
              </StockDiv>
              <HoldingDiv $isPositive={trade.profitAnsLossAmount}>
                <EvaluationAmount>
                  {normalizeNumber(trade.evaluationAmount)}원
                </EvaluationAmount>
                <RowDiv>
                  <Profit>
                    {trade.profitAnsLossAmount > 0
                      ? `▲ ${normalizeNumber(trade.profitAnsLossAmount)}원`
                      : trade.profitAnsLossAmount < 0
                      ? `▼ ${normalizeNumber(trade.profitAnsLossAmount)}원`
                      : `${normalizeNumber(trade.profitAnsLossAmount)}원`}
                  </Profit>

                  <Profit>
                    &nbsp;
                    {trade.profit > 0
                      ? `(+${trade.profit.toFixed(2)}%)`
                      : `(${trade.profit.toFixed(2)}%)`}
                  </Profit>
                </RowDiv>
              </HoldingDiv>
            </Wrapper>
          ))}
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
  height: calc(100vh - 325px);
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
  font-size: 18px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  margin-top: 20px;
  height: calc(100vh - 425px);
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ $isPositive }) =>
    $isPositive > 0 ? "#FFE6F1" : $isPositive < 0 ? "#d2e9ff" : "#ebebeb"};
  border-radius: 15px;
  padding: 15px;
  height: 90px;
  margin-top: 10px;
`;

const StockDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
`;

const StockName = styled.div`
  font-size: 25px;
  font-weight: 600;
`;

const StockQuantity = styled.div`
  font-size: 16px;
`;

const HoldingDiv = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ $isPositive }) =>
    $isPositive > 0 ? "#EE3124" : $isPositive < 0 ? "#154B9B" : "#000000"};
  /* color: #154b9b; */
  gap: 3px;
  flex: 1;
  text-align: right;
`;

const EvaluationAmount = styled.div`
  font-size: 20px;
  font-weight: 600;
`;

const RowDiv = styled.div`
  display: flex;
  flex-direction: column;
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
  width: 105px;
  height: 40px;
  font-size: 18px;
`;
