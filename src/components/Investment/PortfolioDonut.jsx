import React, { useEffect, useRef } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import styled from "styled-components";
import * as S from "../../styles/GlobalStyles";

ChartJS.register(ArcElement, Tooltip, Legend);

const PortfolioDonut = ({ toggleShow, setHeight }) => {
  const chartRef = useRef(null);
  const containerRef = useRef(null); // Container 참조 생성

  const donutData = {
    labels: ["Red", "Blue", "Yellow", "green", "dd", "ddsafa"],
    datasets: [
      {
        data: [12, 19, 3, 2, 5, 14],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(236, 217, 168, 0.9)",
          "rgba(0, 255, 8, 0.9)",
        ],
        borderColor: ["rgb(255, 255, 255)"],
        borderWidth: 3,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        titleFont: {
          size: 12,
        },
        bodyFont: {
          size: 12,
        },
        callbacks: {
          label: (item) => {
            const count = item.dataset.data[item.dataIndex];
            return ` ${count}`;
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

  useEffect(() => {
    if (containerRef.current) {
      setHeight(containerRef.current.offsetHeight);
      console.log("Container height:", containerRef.current.offsetHeight);
    }
  }, []);

  return (
    <Container ref={containerRef}>
      <ColumnDiv>
        <InfoDiv>My증권계좌 포트폴리오</InfoDiv>
        <SwitchBtn onClick={toggleShow}>리스트 보기</SwitchBtn>
        <Div>평가금액</Div>
        <EvaluationAmount>12852540원</EvaluationAmount>
        <S.RowDiv>
          <Profit>▲1214534원 (7.42%)</Profit>
        </S.RowDiv>
        <Doughnut ref={chartRef} data={donutData} options={options} />
      </ColumnDiv>
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
  height: 100%;
  background-color: #f4f9ff;
  border-radius: 15px;
`;

const ColumnDiv = styled.div`
  position: relative;
  max-width: 330px;
  display: flex;
  flex-direction: column;
  padding: 30px 20px;
  gap: 20px;
`;

const InfoDiv = styled.div`
  font-size: 17px;
`;

const Div = styled.div`
  font-size: 15px;
`;

const EvaluationAmount = styled.div`
  font-size: 25px;
`;

const Profit = styled.div`
  color: #f00;
  font-size: 20px;
  margin-right: auto;
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
