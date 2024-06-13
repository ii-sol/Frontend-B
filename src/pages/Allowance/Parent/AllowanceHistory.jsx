import React from "react";
import tw from "twin.macro";
import { styled } from "styled-components";

import Header from "~/components/common/Header";
import HistoryFilter from "~/components/common/HistoryFilter";
import RequestCardChild from "~/components/Allowance/RequestCardChild";
import RegularAllowanceHistoryCard from "~/components/Allowance/RegularAllowanceHistoryCard";

import PleaseImg from "~/assets/img/Allowance/please.svg";
import HeartImg from "~/assets/img/Allowance/heart.svg";

const data = [
  { id: 1, status: "조르기", allowance: 1000, img: PleaseImg, message: "과자 먹고 싶어요", createdDate: "2024-05-31" },
  { id: 2, status: "정기용돈", allowance: 100000, createdDate: "2024-06-04" },
  { id: 3, status: "조르기", allowance: 5000, img: HeartImg, message: "준비물 사야 해요", createdDate: "2024-06-11" },
];

const AllowanceHistory = () => {
  const renderItem = (item) => {
    if (item.status === "조르기") {
      return <RequestCardChild key={item.id} allowance={item.allowance} img={item.img} message={item.message} />;
    } else if (item.status === "정기용돈") {
      return <RegularAllowanceHistoryCard key={item.id} allowance={item.allowance} />;
    }
    return null;
  };

  return (
    <Container>
      <Header left={"<"} title={"용돈 내역"} right={""} />
      <HistoryFilter data={data} filterOptions={["전체", "조르기", "정기용돈"]} emptyStateText="용돈 내역이 없어요" renderItem={renderItem}></HistoryFilter>
    </Container>
  );
};

export default AllowanceHistory;

const Container = styled.div``;
