import React, { useState, useEffect } from "react";
import tw from "twin.macro";
import { styled } from "styled-components";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";

import FilterOptions from "./FilterOptions";

const DateHeader = ({ leftChild, year, month, rightChild, onDateSelect }) => {
  const [openFilter, setOpenFilter] = useState(false);
  const [title, setTitle] = useState(`${year}년 ${month}월`);

  useEffect(() => {
    setTitle(`${year}년 ${month}월`);
  }, [year, month]);

  const handleTitleClick = () => {
    setOpenFilter(true);
  };

  const handleDismiss = () => {
    setOpenFilter(false);
  };

  const handleFilterSelect = (selectedYear, selectedMonth) => {
    onDateSelect(selectedYear, selectedMonth);
    setOpenFilter(false);
  };

  return (
    <Container>
      <Content>{leftChild}</Content>
      <Content onClick={handleTitleClick}>{title}</Content>
      <Content>{rightChild}</Content>
      <BottomSheet open={openFilter} onDismiss={handleDismiss}>
        <FilterOptions onSelect={handleFilterSelect} onClose={handleDismiss} />
      </BottomSheet>
    </Container>
  );
};

export default DateHeader;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 45px;
  background: #f4f9ff;
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
