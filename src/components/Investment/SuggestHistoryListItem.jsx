import React from "react";
import { styled } from "styled-components";
import * as S from "../../styles/GlobalStyles";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCode, setProposeId } from "../../store/reducers/Invest/invest";

const SuggestHistoryListItem = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const renderBadge = (status) => {
    switch (status) {
      case 3:
        return (
          <S.Badge $back="#D5E0F1" $font="#346BAC">
            수락
          </S.Badge>
        );
      case 5:
        return (
          <S.Badge $back="#FFDCDC" $font="#CC3535">
            거절
          </S.Badge>
        );
      case 1:
        return (
          <S.Badge $back="#FFE196" $font="#FF7A00">
            대기
          </S.Badge>
        );
      case 4:
        return (
          <S.Badge $back="#D5E0F1" $font="#346BAC">
            수락
          </S.Badge>
        );
      default:
        return <div style={{ height: "30px" }}></div>;
    }
  };
  return (
    <Wrapper
      key={data.proposeId}
      onClick={() => {
        dispatch(setProposeId(data.proposeId));
        dispatch(setCode(data.ticker));
        navigate(`/invest/history/${data.proposeId}`);
      }}
    >
      <RowDiv>
        {renderBadge(data.status)}
        <S.TradeBadge
          $width="50px"
          $size="20px"
          $back={data.tradingCode}
          style={{ position: "absolute", top: "15px", right: "15px" }}
        >
          {data.tradingCode === 1 ? "매수" : "매도"}
        </S.TradeBadge>
      </RowDiv>
      <Who>From. {data.recieverName}</Who>
      <Content>{data.message}</Content>
      <DetailDiv>
        <Div $font="#154B9B">종목 : {data.companyName}</Div>
        <Div $font="#FF7A00">수량 : {data.quantity}주</Div>
      </DetailDiv>
    </Wrapper>
  );
};

export default SuggestHistoryListItem;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 170px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background: #ffffff;
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
  font-size: 17px;
  font-weight: 500;
  margin-top: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const DetailDiv = styled.div`
  position: absolute;
  right: 15px;
  bottom: 15px;
  display: flex;
  gap: 5px;
`;

const Div = styled.div`
  font-size: 17px;
  font-weight: 500;
  /* margin-top: 10px; */
  color: ${(props) => props.$font};
`;
