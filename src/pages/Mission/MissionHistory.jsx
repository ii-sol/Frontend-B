import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import Header from "~/components/common/Header";
import HistoryFilter from "~/components/common/History/HistoryFilter";

const MissionHistory = () => {
  const navigate = useNavigate();

  const handleLeftClick = () => {
    navigate("/parent/mission");
  };

  return (
    <Container>
      <Header onLeftClick={handleLeftClick} title={"미션 내역"} />
      <HistoryFilter />
    </Container>
  );
};

export default MissionHistory;

const Container = styled.div``;
