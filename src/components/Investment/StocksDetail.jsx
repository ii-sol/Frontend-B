import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts"; // react-apexcharts로 변경
import * as S from "../../styles/GlobalStyles";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const StocksDetail = ({ selectedStockId, accountNum, type }) => {
  console.log(selectedStockId);
  const navigate = useNavigate();
  const [selected, setSelected] = useState("1년차트");
  const handleClick = (chartType) => {
    setSelected(chartType);
  };

  const data = [
    {
      time_close: "2023-01-01T00:00:00Z",
      open: 1500,
      high: 1550,
      low: 1480,
      close: 1520,
    },
    {
      time_close: "2023-02-01T00:00:00Z",
      open: 1520,
      high: 1580,
      low: 1510,
      close: 1570,
    },
    {
      time_close: "2023-03-01T00:00:00Z",
      open: 1570,
      high: 1600,
      low: 1500,
      close: 1510,
    },
    {
      time_close: "2023-04-01T00:00:00Z",
      open: 1590,
      high: 1620,
      low: 1580,
      close: 1610,
    },
  ];

  const [chartOptions, setChartOptions] = useState({
    theme: {
      mode: "dark",
    },
    chart: {
      type: "candlestick",
      height: 350,
      width: 500,
      toolbar: {
        show: false,
      },
      background: "transparent",
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    yaxis: {
      show: false,
    },
    xaxis: {
      type: "datetime",
      categories: data.map((price) => price.time_close),
      labels: {
        style: {
          colors: "#9c88ff",
        },
      },
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: "#3C90EB",
          downward: "#DF7D46",
        },
      },
    },
  });

  const [chartSeries, setChartSeries] = useState([
    {
      data: data.map((price) => {
        return {
          x: new Date(price.time_close),
          y: [price.open, price.high, price.low, price.close],
        };
      }),
    },
  ]);

  useEffect(() => {
    setChartOptions((prevOptions) => ({
      ...prevOptions,
      xaxis: {
        ...prevOptions.xaxis,
        categories: data.map((price) => price.time_close),
      },
    }));
    setChartSeries([
      {
        data: data.map((price) => ({
          x: new Date(price.time_close),
          y: [price.open, price.high, price.low, price.close],
        })),
      },
    ]);
  }, [selected]);

  return (
    <Container>
      <RowDiv>
        <S.RowDiv>
          <ToggleBtn
            $selected={selected === "1년차트"}
            onClick={() => handleClick("1년차트")}
          >
            1년차트
          </ToggleBtn>
          <ToggleBtn
            $selected={selected === "한달차트"}
            onClick={() => handleClick("한달차트")}
          >
            한달차트
          </ToggleBtn>
        </S.RowDiv>
        <StockDiv>삼성전자</StockDiv>
      </RowDiv>
      <S.CenterDiv>
        <ReactApexChart
          type="candlestick"
          series={chartSeries}
          options={chartOptions}
          height={350}
          width={320}
        />
      </S.CenterDiv>
      <InfoDiv>투자 지표</InfoDiv>
      <RowDiv>
        <BoxDiv>
          <AboutDiv>시가총액</AboutDiv>
          <ContentDiv>153조원</ContentDiv>
        </BoxDiv>
        <BoxDiv>
          <AboutDiv>배당수익률</AboutDiv>
          <ContentDiv>153조원</ContentDiv>
        </BoxDiv>
        <BoxDiv>
          <AboutDiv>PBR</AboutDiv>
          <ContentDiv>153조원</ContentDiv>
        </BoxDiv>
      </RowDiv>
      <RowDiv>
        <BoxDiv>
          <AboutDiv>PER</AboutDiv>
          <ContentDiv>153조원</ContentDiv>
        </BoxDiv>
        <BoxDiv>
          <AboutDiv>ROE</AboutDiv>
          <ContentDiv>153조원</ContentDiv>
        </BoxDiv>
        <BoxDiv>
          <AboutDiv>PSR</AboutDiv>
          <ContentDiv>153조원</ContentDiv>
        </BoxDiv>
      </RowDiv>
      <RowDiv $center="center" $top="20" $gap="20">
        {type === "searchDetail" ? (
          <div style={{ marginBottom: "15px", width: "100%" }}>
            <S.BottomBtn2
              onClick={() =>
                navigate("/invest/member", {
                  state: { type: "종목", data: { stockName: "삼성전자" } },
                })
              }
            >
              다음
            </S.BottomBtn2>
          </div>
        ) : (
          <>
            <S.BuyBtn
              $background="#FF5959"
              onClick={() =>
                navigate("/invest/trading", {
                  state: { trade: "buy", accountNum: accountNum },
                })
              }
            >
              구매하기
            </S.BuyBtn>
            <S.BuyBtn
              $background="#5987ff"
              onClick={() =>
                navigate("/invest/trading", {
                  state: { trade: "sell", accountNum: accountNum },
                })
              }
            >
              판매하기
            </S.BuyBtn>
          </>
        )}
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
  justify-content: ${(props) =>
    props.$center ? props.$center : "space-between"};
  align-items: center;
  margin-top: ${(props) => (props.$top ? props.$top : "10")}px;
  gap: ${(props) => (props.$gap ? props.$gap : "10")}px;
`;

const ToggleBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 65px;
  height: 30px;
  border-radius: 5px;
  background: ${(props) => (props.$selected ? "#154B9B" : "#F4F9FF")};
  color: ${(props) => (props.$selected ? "white" : "#949494")};
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  &:hover {
    background: ${(props) => (props.$selected ? "#154B9B" : "#F4F9FF")};
  }
  margin-right: 15px;
  font-size: 15px;
`;

const StockDiv = styled.div`
  font-size: 25px;
`;

const InfoDiv = styled.div`
  text-align: left;
  font-size: 20px;
`;

const BoxDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3px;
  width: 106px;
  height: 75px;
  border-radius: 15px;
  background: #f5f5f5;
`;

const AboutDiv = styled.div`
  color: #6a6a6a;
  font-size: 13px;
`;

const ContentDiv = styled.div`
  font-size: 15px;
`;
