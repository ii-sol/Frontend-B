import React from "react";
import Header from "../../../components/Investment/Header";
import { styled } from "styled-components";
import * as S from "../../../styles/GlobalStyles";
import Good from "../../../assets/img/common/Good.svg";
import { useLocation, useNavigate } from "react-router-dom";

const Done = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  console.log(state);
  return (
    <S.Container>
      <Header type="none" />
      <S.CenterDiv>
        <Img src={Good} />
        {state.type === "suggest" ? <Div>제안 완료</Div> : <Div>거래 완료</Div>}
        <Box>
          {state.type === "suggest" ? (
            <Message>
              {state.data.who} 님에게 <br /> {state.data.what}를 보냈습니다!
            </Message>
          ) : (
            <Message $trade={state.data.trade}>
              {state.data.stockName} {state.data.quantity}주<br />
              <span>{state.data.trade === "buy" ? "구매" : "판매"}</span>{" "}
              완료했습니다.
              <br />
              {state.data.price}
            </Message>
          )}
        </Box>
        <S.BottomBtn onClick={() => navigate("/invest")}>완료</S.BottomBtn>
      </S.CenterDiv>
    </S.Container>
  );
};

export default Done;

const Img = styled.img``;

const Div = styled.div`
  font-size: 25px;
  text-align: center;
  margin-top: -20px;
  font-weight: 600;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  width: 100%;
  height: 150px;
  background-color: #f4f9ff;
  border-radius: 1 5px;
`;

const Message = styled.div`
  font-size: 20px;
  text-align: center;
  line-height: 30px;

  span {
    color: ${(props) => (props.$trade === "buy" ? "#FF5959" : "#1573FE")};
  }
`;
