import React from "react";
import * as S from "../../styles/GlobalStyles";
import Header from "../../components/Investment/Header";
import SuggestionDetailComp from "../../components/Investment/SuggestionDetail";

const SuggestionDetail = () => {
  return (
    <S.Container>
      <Header type="none" title="투자 제안서" />
      <SuggestionDetailComp />
    </S.Container>
  );
};

export default SuggestionDetail;
