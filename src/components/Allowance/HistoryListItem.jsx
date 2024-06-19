import React from "react";
import tw from "twin.macro";
import { styled } from "styled-components";
import * as S from "../../styles/GlobalStyles";

import RequestCardP from "~/components/Allowance/RequestCardP";
import RegularAllowanceHistoryCard from "~/components/Allowance/RegularAllowanceHistoryCard";

import CardImg from "~/assets/img/Allowance/allowanceRequest.svg";
import EmptyImage from "~/assets/img/common/empty.svg";

const HistoryListItem = () => {
  const data = [
    { id: 1, status: "조르기", allowance: 1000, message: "과자 먹고 싶어요", createdDate: "2024-05-31" },
    { id: 2, status: "정기용돈", allowance: 100000, createdDate: "2024-06-04" },
    { id: 3, status: "조르기", allowance: 5000, message: "준비물 사야 해요", createdDate: "2024-06-11" },
  ];

  const renderItem = (item) => {
    if (item.status === "조르기") {
      return <RequestCardP key={item.id} allowance={item.allowance} img={CardImg} message={item.message} />;
    } else if (item.status === "정기용돈") {
      return <RegularAllowanceHistoryCard key={item.id} allowance={item.allowance} />;
    }
    return null;
  };

  return (
    <Container>
      <List>
        {data.length === 0 ? (
          <EmptyState>
            <Img src={EmptyImage} alt="No data" />
            <EmptyText>용돈 내역이 없어요</EmptyText>
          </EmptyState>
        ) : (
          <S.CardContainer>{data.map((item) => renderItem(item))}</S.CardContainer>
        )}
      </List>
    </Container>
  );
};

export default HistoryListItem;

const Container = styled.div``;

const List = styled.ul`
  ${tw`list-none p-0`}
`;

const EmptyState = styled.div`
  ${tw`flex flex-col items-center justify-center h-full mt-20`}
`;

const Img = styled.img`
  ${tw`h-auto mb-4`}
  width: 40%
`;

const EmptyText = styled.div`
  ${tw`text-2xl`}
`;
