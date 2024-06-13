import React from "react";
import tw from "twin.macro";
import { styled } from "styled-components";

import Header from "~/components/common/Header";
import HistoryFilter from "~/components/common/HistoryFilter";

const data = [
  {
    "senderAccountNum": "123-456-7890",
    "senderName": "박지민",
    "recieverAccountNum": "987-654-3210",
    "recieverName": "양은수",
    "content": "용돈 조르기",
    "amount": 50000,
    "balance": "250000",
    "createdDate": "2024-05-10",
  },
  {
    "senderAccountNum": "123-456-7890",
    "senderName": "박지민",
    "recieverAccountNum": "987-654-3210",
    "recieverName": "양은수",
    "content": "돈 보내기",
    "amount": -30000,
    "balance": "220000",
    "createdDate": "2024-06-01",
  },
  {
    "senderAccountNum": "123-456-7890",
    "senderName": "박지민",
    "recieverAccountNum": "987-654-3210",
    "recieverName": "양은수",
    "content": "결제",
    "amount": -5000,
    "balance": "215000",
    "createdDate": "2024-06-05",
  },
  {
    "senderAccountNum": "123-456-7890",
    "senderName": "박지민",
    "recieverAccountNum": "987-654-3210",
    "recieverName": "양은수",
    "content": "결제",
    "amount": -12000,
    "balance": "203000",
    "createdDate": "2024-06-09",
  },
  {
    "senderAccountNum": "123-456-7890",
    "senderName": "박지민",
    "recieverAccountNum": "987-654-3210",
    "recieverName": "양은수",
    "content": "대출금",
    "amount": -50000,
    "balance": "233000",
    "createdDate": "2024-06-10",
  },
  {
    "senderAccountNum": "123-456-7890",
    "senderName": "박지민",
    "recieverAccountNum": "987-654-3210",
    "recieverName": "양은수",
    "content": "용돈",
    "amount": 50000,
    "balance": "285000",
    "createdDate": "2024-06-10",
  },
  {
    "senderAccountNum": "123-456-7890",
    "senderName": "박지민",
    "recieverAccountNum": "987-654-3210",
    "recieverName": "양은수",
    "content": "미션",
    "amount": 30000,
    "balance": "233000",
    "createdDate": "2024-06-10",
  },
];

const AllowanceHistory = () => {
  return (
    <Container>
      <Header left={"<"} title={"용돈 내역"} right={"취소"} />
      <HistoryFilter data={data} filterOptions={["전체", "나간 돈", "들어온 돈"]} emptyStateText="용돈 내역이 없어요"></HistoryFilter>
    </Container>
  );
};

export default AllowanceHistory;

const Container = styled.div``;
