import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { styled } from "styled-components";
import * as S from "../../styles/GlobalStyles";
import { useDispatch, useSelector } from "react-redux";

const AreaChart = ({ selected }) => {
  const chartsData = useSelector((state) => state.invest.charts);

  const formattedData = chartsData
    .map((price) => ({
      time_close: `${price.stck_bsop_date.slice(
        0,
        4
      )}-${price.stck_bsop_date.slice(4, 6)}-${price.stck_bsop_date.slice(
        6,
        8
      )}`,
      open: parseFloat(price.stck_oprc),
      high: parseFloat(price.stck_hgpr),
      low: parseFloat(price.stck_lwpr),
      close: parseFloat(price.stck_clpr),
    }))
    .sort((a, b) => new Date(a.time_close) - new Date(b.time_close));

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
      type: "area",
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
      width: 4,
    },
    colors: ["#5fafff"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.9,
        opacityTo: 0.7,
        shade: "dark",
        type: "vertical",
        gradientToColors: ["#ffffff"],
        inverseColors: false,
        stops: [0, 100],
        colorStops: [
          {
            offset: 0,
            color: "#5fafff",
            opacity: 0.9,
          },
          {
            offset: 100,
            color: "#ffffff",
            opacity: 0.7,
          },
        ],
      },
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

  const chartSeries = [
    {
      name: "Close",
      data: formattedData.map((price) => {
        return {
          x: Date.parse(price.time_close),
          y: price.close,
        };
      }),
    },
  ];

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
  }, [selected, chartsData]);

  return (
    <Container>
      <S.CenterDiv>
        <ReactApexChart
          type="area"
          series={chartSeries}
          options={chartOptions}
          height={350}
          width={320}
        />
      </S.CenterDiv>
    </Container>
  );
};

export default AreaChart;

const Container = styled.div`
  .apexcharts-toolbar {
    background: rgba(0, 55, 123, 0.5);
    border-radius: 4px;
    padding: 0px 2px 2px 2px;
  }
`;
