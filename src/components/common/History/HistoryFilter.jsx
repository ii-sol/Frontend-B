import React, { useState } from "react";
import tw from "twin.macro";
import { styled } from "styled-components";

import DateHeader from "./DateHeader";
import HistoryList from "./HistoryList";

const HistoryFilter = () => {
  return (
    <Container>
      <DateHeader />
      <HistoryList />
    </Container>
  );
};

export default HistoryFilter;

const Container = styled.div`
  ${tw`flex flex-col w-full gap-5`}
`;
