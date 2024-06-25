import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { styled } from "styled-components";
import * as S from "../../styles/GlobalStyles";
import { useDispatch, useSelector } from "react-redux";

const CandleChart = ({ selected }) => {
  const chartsData = useSelector((state) => state.invest.charts);
  const [chartType, setChartType] = useState("area");

  const formattedData = chartsData
    .map((price) => ({
      time_close: `${price.localDate.slice(0, 4)}-${price.localDate.slice(
        4,
        6
      )}-${price.localDate.slice(6, 8)}`,
      open: parseFloat(price.openPrice),
      high: parseFloat(price.highPrice),
      low: parseFloat(price.lowPrice),
      close: parseFloat(price.closePrice),
    }))
    .sort((a, b) => new Date(a.time_close) - new Date(b.time_close));

  const filterMonthlyData = (data) => {
    const result = [];
    const seenMonths = new Set();

    data.forEach((price) => {
      const date = new Date(price.time_close);
      const month = date.getMonth();
      if (!seenMonths.has(month)) {
        seenMonths.add(month);
        result.push(price);
      }
    });

    return result;
  };

  const monthlyData = filterMonthlyData(formattedData);

  const getDataBasedOnSelection = () => {
    return selected === 1 ? monthlyData : formattedData;
  };

  const xAxisCategories = () => {
    if (selected === 1) {
      return "MMM";
    } else {
      return "dd MMM";
    }
  };

  const [chartOptions, setChartOptions] = useState({
    theme: {
      mode: "dark",
    },
    chart: {
      type: "candlestick",
      height: 350,
      width: 500,
      toolbar: {
        show: true,
        tools: {
          download: false,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: false,
          customIcons: [],
        },
        autoSelected: "zoom",
      },
      background: "transparent",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    yaxis: {
      show: true,
      tooltip: {
        enabled: true,
      },
      labels: {
        style: {
          colors: "#676767",
        },
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        format: xAxisCategories(),
        style: {
          colors: "#676767",
        },
      },
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: "#5987FF",
          downward: "#FF5959",
        },
      },
    },
  });

  const [chartSeries, setChartSeries] = useState([
    {
      data: getDataBasedOnSelection().map((price) => {
        return {
          x: Date.parse(price.time_close),
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
        labels: {
          ...prevOptions.xaxis.labels,
          format: xAxisCategories(),
        },
      },
    }));

    setChartSeries([
      {
        data: getDataBasedOnSelection().map((price) => ({
          x: Date.parse(price.time_close),
          y: [price.open, price.high, price.low, price.close],
        })),
      },
    ]);
  }, [selected, chartsData]);

  return (
    <Container>
      <S.CenterDiv>
        <ReactApexChart
          type="candlestick"
          series={chartSeries}
          options={chartOptions}
          height={350}
          width={320}
        />
      </S.CenterDiv>
    </Container>
  );
};

export default CandleChart;

const Container = styled.div`
  .apexcharts-toolbar {
    background: rgba(0, 55, 123, 0.5);
    border-radius: 4px;
    padding: 0px 2px 2px 2px;
    z-index: 0;
  }
`;
