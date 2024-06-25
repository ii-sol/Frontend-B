import React, { useEffect, useRef, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import styled from "styled-components";
import * as S from "../../styles/GlobalStyles";
import { useSelector } from "react-redux";
import { normalizeNumber } from "../../utils/normalizeNumber";

ChartJS.register(ArcElement, Tooltip, Legend);

const PortfolioDonut = ({ toggleShow }) => {
  const selectedChildName = useSelector(
    (state) => state.user.selectedChildName
  );
  const totalEvaluationAmount = useSelector(
    (state) => state.portfolio.totalEvaluationAmount
  );
  const totalPurchaseAmount = useSelector(
    (state) => state.portfolio.totalPurchaseAmount
  );
  const totalProfit = useSelector((state) => state.portfolio.totalProfit);

  const changeMoney = totalEvaluationAmount - totalPurchaseAmount;
  let roundedTotalProfit = 0;
  if (totalProfit != "Infinity" && totalProfit != "NaN") {
    roundedTotalProfit = totalProfit.toFixed(2);
  }

  const investTradeList = useSelector(
    (state) => state.portfolio.investTradeList
  );

  const [donutData, setDonutData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        borderColor: ["rgb(255, 255, 255)"],
        borderWidth: 3,
      },
    ],
  });

  const chartRef = useRef(null);

  useEffect(() => {
    if (investTradeList.length > 0) {
      const labels = investTradeList.map((trade) => trade.companyName);
      const data = investTradeList.map((trade) => trade.holdingRatio);
      const backgroundColor = [
        "#ffd4ef",
        "#fcffc2",
        "#c3e8ff",
        "#c0ffbc",
        "#ffbebe",
        "#e2c9ff",
        "#c3fff7",
        "#ffe7b5",
      ];

      setDonutData({
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: backgroundColor.slice(0, data.length),
            borderColor: ["rgb(255, 255, 255)"],
            borderWidth: 2,
          },
        ],
      });
    }
  }, [investTradeList]);

  const options = {
    plugins: {
      legend: {
        labels: {
          font: {
            size: 15,
          },
        },
      },
      tooltip: {
        titleFont: {
          size: 18,
        },
        bodyFont: {
          size: 18,
        },
        callbacks: {
          label: (context) => {
            const value = context.raw || "";

            return `${(value * 100).toFixed(1)}%`;
          },
        },
      },
    },
  };

  useEffect(() => {
    const chartInstance = chartRef.current;
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);

  return (
    <Container>
      {investTradeList.length > 0 ? (
        <ColumnDiv>
          <InfoDiv>{selectedChildName}의 포트폴리오</InfoDiv>
          <SwitchBtn onClick={toggleShow}>리스트 보기</SwitchBtn>
          <Div>평가금액</Div>
          <EvaluationAmount>
            {normalizeNumber(totalEvaluationAmount)}원
          </EvaluationAmount>
          <S.RowDiv>
            <Profit $isPositive={changeMoney > 0}>
              {changeMoney > 0
                ? `▲ ${normalizeNumber(changeMoney)}원`
                : changeMoney < 0
                ? `▼ ${normalizeNumber(changeMoney)}원`
                : `${normalizeNumber(changeMoney)}원`}
              &nbsp;
              {totalProfit > 0
                ? `(+${roundedTotalProfit}%)`
                : `(${roundedTotalProfit}%)`}
            </Profit>
          </S.RowDiv>
          <Doughnut ref={chartRef} data={donutData} options={options} />
        </ColumnDiv>
      ) : (
        <NoDataDiv>주식 포트폴리오 관리하기</NoDataDiv>
      )}
    </Container>
  );
};

export default PortfolioDonut;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  min-height: calc(100vh - 325px);
  height: 100%;
  background-color: #ebf5ff;
  border-radius: 15px;
`;

const ColumnDiv = styled.div`
  position: relative;
  max-width: 330px;
  display: flex;
  flex-direction: column;
  padding: 30px 20px;
`;

const InfoDiv = styled.div`
  font-size: 18px;
`;

const Div = styled.div`
  margin: 35px 0px 5px 0px;
  font-size: 17px;
`;

const EvaluationAmount = styled.div`
  font-size: 22px;
  margin-bottom: 10px;
`;

const Profit = styled.div`
  color: ${({ $isPositive }) => ($isPositive ? "#FF5959" : "#5987ff")};
  font-size: 18px;
  margin-right: auto;
  margin-bottom: 35px;
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

const NoDataDiv = styled.div`
  font-size: 18px;
  color: #666;
  text-align: center;
  margin: 20px;
`;
