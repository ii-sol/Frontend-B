import React from "react";
import tw from "twin.macro";
import { styled } from "styled-components";

import Header from "~/components/common/Header";
import HistoryFilter from "~/components/common/HistoryFilter";
import RequestCardChild from "~/components/Allowance/RequestCardChild";

import PleaseImg from "~/assets/img/Allowance/please.svg";
import HeartImg from "~/assets/img/Allowance/heart.svg";

const data = [
  { id: 1, status: "완료", receiver: "엄마", allowance: 1000, img: PleaseImg, createdDate: "2024-05-31" },
  { id: 2, status: "취소", receiver: "엄마", allowance: 1000, img: PleaseImg, createdDate: "2024-06-04" },
  { id: 3, status: "취소", receiver: "아빠", allowance: 5000, img: HeartImg, createdDate: "2024-06-11" },
];

const AllowanceRequestHistory = () => {
  const renderItem = (item) => <RequestCardChild key={item.id} status={item.status} receiver={item.receiver} allowance={item.allowance} img={item.img} />;

  return (
    <Container>
      <Header left={"<"} title={"용돈 조르기"} right={""} />
      <HistoryFilter data={data} filterOptions={["전체", "완료", "취소"]} emptyStateText="용돈 조르기 내역이 없어요" renderItem={renderItem}></HistoryFilter>
    </Container>
  );
};

export default AllowanceRequestHistory;

const Container = styled.div``;
