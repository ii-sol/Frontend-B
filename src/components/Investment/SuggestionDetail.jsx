import React from "react";
import { styled } from "styled-components";
import Indicator from "./Indicator";
import Chart from "./Chart";
//TODO: 거절 메시지 추가
//TODO: 대기면 거절 수락 상단에 버튼 추가
const SuggestionDetail = ({ data }) => {
  return (
    <Container>
      <NameDiv>{data.name}</NameDiv>
      <RowDiv>
        <DetailWrapper>
          <DetailDiv>시장가 : {data.price}원</DetailDiv>
          <DetailDiv>수량 : {data.quantity}주</DetailDiv>
        </DetailWrapper>
        <Badge>{data.trade}</Badge>
      </RowDiv>
      <Div>{data.message}</Div>
      <Div style={{ textAlign: "right", marginBottom: "0px" }}>{data.date}</Div>
      <Chart />
      <Indicator />
    </Container>
  );
};

export default SuggestionDetail;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 15px;
  background: #ffffff;
  box-shadow: 0px 0px 5px 0px #c8ddff;
  padding: 20px;
`;

const NameDiv = styled.div`
  text-align: center;
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const RowDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Badge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ff4c4c;
  color: white;
  width: 70px;
  height: 70px;
  font-size: 25px;
  border-radius: 15px;
`;

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
`;

const DetailDiv = styled.div`
  font-size: 20px;
`;

const Div = styled.div`
  font-size: 20px;
  margin-bottom: 20px;
`;
