import React from "react";
import { styled } from "styled-components";
import { useDispatch } from "react-redux";
import Header from "~/components/common/Header";
import HistoryFilter from "~/components/common/History/HistoryFilter";
import { MdArrowBackIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const LoanHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Container>
      <Header
        left={<MdArrowBackIos />}
        title={"빌려준 기록"}
        onLeftClick={() => {
          navigate("/loan/main");
        }}
      />
      <HistoryFilter />
    </Container>
  );
};

export default LoanHistory;

const Container = styled.div``;
