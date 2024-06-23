import React, { useState } from "react";
import * as S from "../../styles/GlobalStyles";
import Header from "../../components/Investment/Header";
import { styled } from "styled-components";
import suggest from "../../assets/img/Invest/suggest.svg";
import Message from "../../components/common/Message";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../store/reducers/Invest/invest";

const Suggestion = () => {
  const dispatch = useDispatch();
  const parent = useSelector((state) => state.invest.parent);
  const name = useSelector((state) => state.invest.name);
  const trade = useSelector((state) => state.invest.trade);
  const navigate = useNavigate();
  const [messages, setMessages] = useState("");
  const handleInputChange = (message) => {
    setMessages(message);
  };

  const onSuggest = () => {
    navigate("/invest/send");
    dispatch(setMessage(messages));
  };
  return (
    <S.Container>
      <Header type="none" />
      <S.CenterDiv>
        <>
          <Div $size="25" $top="20">
            {parent}에게
            <br />
            {name} 투자를 제안드릴게요
          </Div>
          <Div $size="15" $top="10">
            해당 투자가 합리적인 이유를
            <br />
            작성해주세요!
          </Div>
        </>
        {trade === 0 ? (
          <S.Badge
            $back="#FFDCDC"
            $font="#CC3535"
            style={{ marginTop: "20px" }}
          >
            구매
          </S.Badge>
        ) : (
          <S.Badge
            $back="#D5E0F1"
            $font="#346BAC"
            style={{ marginTop: "20px" }}
          >
            판매
          </S.Badge>
        )}
        <Img src={suggest} />
        <Wrapper>
          <Message
            placeholder="투자 제안 메세지를 적어주세요!"
            maxLength="100"
            onChange={handleInputChange}
            isInvest={true}
          />
        </Wrapper>
        <S.BottomBtn2 onClick={() => onSuggest()}>제안하기</S.BottomBtn2>
      </S.CenterDiv>
    </S.Container>
  );
};

export default Suggestion;

const Div = styled.div`
  font-size: ${(props) => props.$size}px;
  text-align: center;
  margin-top: ${(props) => props.$top}px;
`;

const Img = styled.img`
  margin-top: -70px;
`;

const Wrapper = styled.div`
  margin-top: -30px;
  width: 100%;
`;
