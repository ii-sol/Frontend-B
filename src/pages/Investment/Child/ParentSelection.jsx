import React, { useState } from "react";
import Member from "../../../components/common/Member";
import ChildImage from "~/assets/img/Auth/child.svg";
import { styled } from "styled-components";
import tw from "twin.macro";
import * as S from "../../../styles/GlobalStyles";
import Header from "../../../components/Investment/Header";
import { useLocation, useNavigate } from "react-router-dom";

const ParentSelection = () => {
  const [parents, setParents] = useState(null);
  const navigate = useNavigate();
  const { state } = useLocation();

  return (
    <S.Container>
      <Header type="none" />
      {state.type === "투자" ? (
        <Div>누구에게 투자 제안을 할까요?</Div>
      ) : (
        <Div>누구에게 종목 제안을 할까요?</Div>
      )}

      <MemberContainer>
        <Member
          img={ChildImage}
          name="엄마"
          role="부모"
          phoneNum="010-0000-0000"
          onClick={() => setParents("엄마")}
        />
        <Member
          img={ChildImage}
          name="아빠"
          role="부모"
          phoneNum="010-4321-4321"
          onClick={() => setParents("아빠")}
        />
      </MemberContainer>
      <S.BottomBtn
        onClick={() => {
          if (state.type === "투자") {
            navigate("/invest/suggest", {
              state: {
                type: "투자",
                data: {
                  trade: state.data.trade,
                  stockName: state.data.stockName,
                  quantity: state.data.quantity,
                  price: state.data.price,
                  parent: parents,
                },
              },
            });
          } else {
            navigate("/invest/suggest", {
              state: {
                type: "종목",
                data: {
                  stockName: state.data.stockName,
                  parent: parents,
                },
              },
            });
          }
        }}
      >
        다음
      </S.BottomBtn>
    </S.Container>
  );
};

export default ParentSelection;

const MemberContainer = styled.div`
  ${tw`
    flex
    flex-col
    gap-3
  `}
`;

const Div = styled.div`
  font-size: 22px;
  text-align: center;
  margin: 30px auto;
  font-weight: 600;
`;
