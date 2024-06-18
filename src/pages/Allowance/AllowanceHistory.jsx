import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import Header from "~/components/common/Header";
import HistoryFilter from "~/components/common/History/HistoryFilter";

const AllowanceHistory = () => {
  const navigate = useNavigate();

  const handleLeftClick = () => {
    navigate("/allowance/management");
  };

  return (
    <Container>
      <Header onLeftClick={handleLeftClick} title={"용돈 내역"} right={""} />
      <HistoryFilter />
    </Container>
  );
};

export default AllowanceHistory;

const Container = styled.div``;
