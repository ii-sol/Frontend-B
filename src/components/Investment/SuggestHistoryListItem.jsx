import React from "react";
import { styled } from "styled-components";
import * as S from "../../styles/GlobalStyles";
import { useNavigate } from "react-router-dom";

const SuggestHistoryListItem = ({ data }) => {
  const navigate = useNavigate();
  const renderBadge = (status) => {
    switch (status) {
      case 0:
        return (
          <S.Badge $back="#D5E0F1" $font="#346BAC">
            수락
          </S.Badge>
        );
      case 1:
        return (
          <S.Badge $back="#FFDCDC" $font="#CC3535">
            거절
          </S.Badge>
        );
      case 2:
        return (
          <S.Badge $back="#FFE196" $font="#FF7A00">
            대기
          </S.Badge>
        );
      default:
        return <div style={{ height: "30px" }}></div>;
    }
  };
  return (
    <Wrapper
      key={data.proposeId}
      onClick={() => navigate(`/invest/history/${data.proposeId}`)}
    >
      <RowDiv>
        {renderBadge(data.status)}
        <DetailDiv>
          <Div $font="#154B9B">종목 : {data.name}</Div>
          <Div $font="#FF7A00">수량 : {data.quantity}주</Div>
        </DetailDiv>
      </RowDiv>
      <Who>
        {data.direction === 1 ? "From." : "To."} {data.who}
      </Who>
      <Content>{data.message}</Content>
    </Wrapper>
  );
};

export default SuggestHistoryListItem;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 155px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  box-shadow: 0px 0px 4px 0px #98c6ff;
  border-radius: 15px;
  padding: 15px;

  margin-bottom: 20px;
`;

const RowDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Who = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-top: 10px;
`;

const Content = styled.div`
  font-size: 15px;
  font-weight: 500;
  margin-top: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const DetailDiv = styled.div`
  display: flex;
  justify-content: end;
  gap: 5px;
`;

const Div = styled.div`
  font-size: 17px;
  font-weight: 500;
  /* margin-top: 10px; */
  color: ${(props) => props.$font};
`;
