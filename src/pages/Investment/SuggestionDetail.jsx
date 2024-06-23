import React, { useState } from "react";
import * as S from "../../styles/GlobalStyles";
import Header from "../../components/Investment/Header";
import SuggestionDetailComp from "../../components/Investment/SuggestionDetail";

const SuggestionDetail = () => {
  //data 여기서 받음
  const data = {
    name: "삼성전자",
    price: 123000,
    quantity: 3,
    trade: "매수",
    message:
      "안녕하세요. 아버님 제가 이번에 기가 막힌 종목을 찾아왔는데 이 주식이야 말로 저희 집을 바로 세울 기업입니다. 이 기업 앞으로 어쩌고",
    date: "2024년 06월 03일",
  };
  return (
    <S.Container>
      <Header type="none" title="투자 제안서" />
      <SuggestionDetailComp data={data} />
    </S.Container>
  );
};

export default SuggestionDetail;
