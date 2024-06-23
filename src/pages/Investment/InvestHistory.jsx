import React from "react";
import * as S from "../../styles/GlobalStyles";
import Header from "../../components/Investment/Header";
import HistoryFilter from "../../components/common/History/HistoryFilter";

const InvestHistory = () => {
  return (
    <S.Container>
      <Header type="none" title="제안 내역" />
      <HistoryFilter />
    </S.Container>
  );
};

export default InvestHistory;
