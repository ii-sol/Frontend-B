import React from "react";
import { styled } from "styled-components";

import Header from "~/components/common/Header";
import HistoryFilter from "~/components/common/History/HistoryFilter";

const AllowanceHistory = () => {
  return (
    <Container>
      <Header left={"<"} title={"용돈 내역"} right={""} />
      <HistoryFilter />
    </Container>
  );
};

export default AllowanceHistory;

const Container = styled.div``;
