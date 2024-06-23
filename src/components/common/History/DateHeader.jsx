import React, { useState, useEffect } from "react";
import tw from "twin.macro";
import { styled } from "styled-components";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";

import FilterOptions from "./FilterOptions";
import { useDispatch, useSelector } from "react-redux";
import { setMonth, setYear } from "../../../store/reducers/common/history";

const DateHeader = () => {
  const dispatch = useDispatch();
  const year = useSelector((state) => state.history.year);
  const month = useSelector((state) => state.history.month);
  const currentDate = new Date();

  const [title, setTitle] = useState(`${year}년 ${month}월`);
  const [openFilter, setOpenFilter] = useState(false);

  useEffect(() => {
    setTitle(`${year}년 ${month}월`);
  }, [year, month]);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleDismiss = () => {
    setOpenFilter(false);
  };

  const onDecreaseMonth = () => {
    if (month === 1) {
      dispatch(setYear(year - 1));
      dispatch(setMonth(12));
    } else {
      dispatch(setMonth(month - 1));
    }
  };

  const onIncreaseMonth = () => {
    if (!isNextButtonDisabled()) {
      if (month === 12) {
        dispatch(setYear(year + 1));
        dispatch(setMonth(1));
      } else {
        dispatch(setMonth(month + 1));
      }
    }
  };

  const isNextButtonDisabled = () => {
    return (
      year === currentDate.getFullYear() && month - 1 === currentDate.getMonth()
    );
  };

  return (
    <Container>
      <button onClick={onDecreaseMonth}>{"<"}</button>
      <Content onClick={handleOpenFilter}>{title}</Content>
      <button onClick={onIncreaseMonth} disabled={isNextButtonDisabled()}>
        {">"}
      </button>
      <BottomSheet open={openFilter} onDismiss={handleDismiss}>
        <FilterOptions onClose={handleDismiss} />
      </BottomSheet>
    </Container>
  );
};

export default DateHeader;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 45px;
  background: #f0f7ff;
  padding: 10px;
  border-radius: 15px;
  justify-content: space-between;
  font-size: 15px;
  font-weight: 500;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
