import React from "react";
import tw from "twin.macro";
import { styled } from "styled-components";
import * as S from "../../styles/GlobalStyles";

import MissionCard from "./MissionCard";

import MissionImage from "~/assets/img/common/happySol.svg";
import EmptyImage from "~/assets/img/common/empty.svg";

const MissionHistoryListItem = () => {
  const data = [
    { id: 1, status: "완료", mission: "설거지 하기", allowance: 1000, createdDate: "2024-05-31" },
    { id: 2, status: "취소", mission: "설거지 하기", allowance: 1000, createdDate: "2024-06-04" },
    { id: 3, status: "취소", mission: "설거지 하기", allowance: 5000, createdDate: "2024-06-11" },
  ];

  const renderItem = (item) => {
    return <MissionCard key={item.id} status={item.status} mission={item.mission} allowance={item.allowance} img={MissionImage} />;
  };

  return (
    <Container>
      <List>
        {data.length === 0 ? (
          <EmptyState>
            <Img src={EmptyImage} alt="No data" />
            <EmptyText>미션 내역이 없어요</EmptyText>
          </EmptyState>
        ) : (
          <S.CardContainer>{data.map((item) => renderItem(item))}</S.CardContainer>
        )}
      </List>
    </Container>
  );
};

export default MissionHistoryListItem;

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
