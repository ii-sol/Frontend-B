import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import * as S from "../../styles/GlobalStyles";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStock,
  setPathVariable,
} from "../../store/reducers/Invest/invest";
import AreaChart from "./AreaChart";
import CandleChart from "./CandleChart";
import ToggleButton from "../common/ToggleButton";

const Chart = () => {
  const dispatch = useDispatch();
  const code = useSelector((state) => state.invest.code);
  const [selected, setSelected] = useState(1);
  const [chartType, setChartType] = useState("area");

  const handleClick = (chartType) => {
    dispatch(setPathVariable(chartType));
    setSelected(chartType);
  };

  const handleTypeToggle = () => {
    setChartType((prevType) => (prevType === "area" ? "candlestick" : "area"));
  };

  useEffect(() => {
    dispatch(fetchStock({ code: code, pathVariable: selected }));
  }, [dispatch, code, selected]);

  return (
    <Container>
      <S.RowDiv
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          margin: "20px 0px",
        }}
      >
        <S.RowDiv>
          <ToggleBtn $selected={selected === 1} onClick={() => handleClick(1)}>
            1년차트
          </ToggleBtn>
          <ToggleBtn $selected={selected === 0} onClick={() => handleClick(0)}>
            한달차트
          </ToggleBtn>
        </S.RowDiv>
        <ToggleButton chartType={chartType} onToggle={handleTypeToggle} />
      </S.RowDiv>
      <S.CenterDiv>
        {chartType === "area" ? (
          <AreaChart selected={selected} />
        ) : (
          <CandleChart selected={selected} />
        )}
      </S.CenterDiv>
    </Container>
  );
};

export default Chart;

const Container = styled.div`
  .apexcharts-toolbar {
    background: rgba(0, 55, 123, 0.5);
    border-radius: 4px;
    padding: 0px 2px 2px 2px;
    z-index: 0;
  }
`;

const ToggleBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 65px;
  height: 30px;
  border-radius: 5px;
  background: ${(props) => (props.$selected ? "#154B9B" : "#ffffff")};
  color: ${(props) => (props.$selected ? "white" : "#949494")};
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  &:hover {
    background: ${(props) => (props.$selected ? "#154B9B" : "#ffffff")};
  }
  margin-right: 15px;
  font-size: 15px;
`;
