import React from "react";
import Header from "../../components/Investment/Header";
import { styled } from "styled-components";
import tw from "twin.macro";
import * as S from "../../styles/GlobalStyles";
import Complete from "../../assets/img/common/complete.svg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { normalizeNumber } from "../../utils/normalizeNumber";

const Done = () => {
  const parent = useSelector((state) => state.invest.parent);
  const isNew = useSelector((state) => state.invest.isNew);
  const trade = useSelector((state) => state.invest.trade);
  const name = useSelector((state) => state.invest.name);
  const quantity = useSelector((state) => state.invest.quantity);
  const price = useSelector((state) => state.invest.price);
  const myAmount = useSelector((state) => state.invest.myAmount);
  const navigate = useNavigate();
  return (
    <S.Container>
      <Header type="none" />
      <S.CenterDiv>
        <Img src={Complete} />
        {isNew ? <Div>제안 완료</Div> : <Div>거래 완료</Div>}
        <Box>
          {isNew ? (
            <Message>
              <span style={{ fontWeight: "700" }}>{parent}</span> 님에게 <br />{" "}
              투자 제안서를 보냈습니다!
            </Message>
          ) : (
            <Message $trade={trade}>
              <span style={{ fontWeight: "700" }}>
                {name} {quantity}주
              </span>
              <br />
              <span className="trade">{trade === 0 ? "구매 " : "판매 "}</span>
              완료했습니다.
              <br />
              주문 단가 &nbsp;&nbsp;
              <span style={{ fontWeight: "700" }}>
                {normalizeNumber(price)}원
              </span>
              <br />총{" "}
              <span style={{ fontWeight: "700" }}>
                {normalizeNumber(myAmount)}원
              </span>
            </Message>
          )}
        </Box>
        {isNew ? (
          <div tw="text-sm mt-2">
            <span tw="text-[#154B9B]"> 2024.05.31 금</span>까지 응답하지 않으면
            취소돼요.
          </div>
        ) : (
          <></>
        )}
        <S.BottomBtn onClick={() => navigate("/invest")}>완료</S.BottomBtn>
      </S.CenterDiv>
    </S.Container>
  );
};

export default Done;

const Img = styled.img`
  margin: 60px auto 40px auto;
`;

const Div = styled.div`
  font-size: 25px;
  text-align: center;
  font-weight: 600;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  width: 100%;
  height: 150px;
  background-color: #ecf4ff;
  border-radius: 15px;
`;

const Message = styled.div`
  font-size: 20px;
  text-align: center;
  line-height: 30px;

  .trade {
    font-weight: 700;
    color: ${(props) => (props.$trade === 0 ? "#FF5959" : "#1573FE")};
  }
`;
