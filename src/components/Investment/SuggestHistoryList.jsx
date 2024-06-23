import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import { styled } from "styled-components";
import { useSelector } from "react-redux";
import EmptyImage from "~/assets/img/common/empty.svg";
import SuggestHistoryListItem from "./SuggestHistoryListItem";
import { groupDataByDate } from "../../utils/groupDataByDate";

const SuggestHistoryList = () => {
  const status = useSelector((state) => state.history.status);
  const [data, setData] = useState([]);

  useEffect(() => {
    let updatedData;
    if (status === 0) {
      updatedData = [
        {
          proposeId: 0,
          status: 0,
          name: "삼성전자",
          code: "005930",
          quantity: 3,
          trading: 1,
          message:
            "메세지 안녕하세요. 아버님 제가 이번에 기가 막힌 종목을 찾아왔는데 이 주식이야 말로 저희 집을 바로 세울 기업입니다. 이 기업 앞으로 어쩌고",
          who: "엄마",
          createdDate: "2024-05-10",
        },
        {
          proposeId: 1,
          status: 1,
          name: "SK하이닉스",
          code: "005930",
          quantity: 5,
          trading: 1,
          message: "투자 제안 메세지",
          who: "아빠",
          createdDate: "2024-06-01",
        },
        {
          proposeId: 2,
          status: 2,
          name: "삼성물산",
          code: "005930",
          quantity: 5,
          message: "종목 제안 메세지",
          who: "엄마",
          direction: 0,
          createdDate: "2024-06-05",
        },
        {
          proposeId: 3,
          status: 2,
          name: "삼성물산",
          code: "005930",
          quantity: 5,
          message: "종목 제안 메세지",
          who: "엄마",
          direction: 0,
          createdDate: "2024-06-10",
        },
        {
          proposeId: 4,
          status: 2,
          name: "삼성물산",
          code: "005930",
          quantity: 5,
          message: "종목 제안 메세지",
          who: "엄마",
          direction: 0,
          createdDate: "2024-06-10",
        },
        {
          proposeId: 5,
          status: 2,
          name: "삼성물산",
          code: "005930",
          quantity: 5,
          message: "종목 제안 메세지",
          who: "엄마",
          direction: 0,
          createdDate: "2024-06-10",
        },
      ];
    } else if (status === 1) {
      updatedData = [
        {
          proposeId: 0,
          status: 0,
          name: "삼성전자",
          code: "005930",
          quantity: 3,
          trading: 1,
          message:
            "메세지 안녕하세요. 아버님 제가 이번에 기가 막힌 종목을 찾아왔는데 이 주식이야 말로 저희 집을 바로 세울 기업입니다. 이 기업 앞으로 어쩌고",
          who: "엄마",
          createdDate: "2024-05-10",
        },
      ];
    } else if (status === 2) {
      updatedData = [
        {
          proposeId: 1,
          status: 1,
          name: "SK하이닉스",
          code: "005930",
          quantity: 5,
          trading: 1,
          message: "투자 제안 메세지",
          who: "아빠",
          createdDate: "2024-06-01",
        },
      ];
    } else {
      updatedData = [
        {
          proposeId: 2,
          status: 2,
          name: "삼성물산",
          code: "005930",
          quantity: 5,
          message: "종목 제안 메세지",
          who: "엄마",
          direction: 0,
          createdDate: "2024-06-05",
        },
        {
          proposeId: 3,
          status: 2,
          name: "삼성물산",
          code: "005930",
          quantity: 5,
          message: "종목 제안 메세지",
          who: "엄마",
          direction: 0,
          createdDate: "2024-06-10",
        },
        {
          proposeId: 4,
          status: 2,
          name: "삼성물산",
          code: "005930",
          quantity: 5,
          message: "종목 제안 메세지",
          who: "엄마",
          direction: 0,
          createdDate: "2024-06-10",
        },
        {
          proposeId: 5,
          status: 2,
          name: "삼성물산",
          code: "005930",
          quantity: 5,
          message: "종목 제안 메세지",
          who: "엄마",
          direction: 0,
          createdDate: "2024-06-10",
        },
      ];
    }
    setData(updatedData);
  }, [status]);

  const groupedData = groupDataByDate(data);
  const sortedGroupedData = Object.keys(groupedData).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  return (
    <Container>
      {sortedGroupedData.length === 0 ? (
        <EmptyState>
          <Img src={EmptyImage} alt="No data" />
          <EmptyText>제안 내역이 없어요</EmptyText>
        </EmptyState>
      ) : (
        sortedGroupedData.map((date, index) => (
          <DateGroup key={index}>
            <DateArea>{date}</DateArea>
            <Hr />
            {groupedData[date].map((d) => (
              <SuggestHistoryListItem key={d.proposeId} data={d} />
            ))}
          </DateGroup>
        ))
      )}
    </Container>
  );
};

export default SuggestHistoryList;

const Container = styled.div``;

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

const DateGroup = styled.div`
  ${tw`mb-9`}
`;

const DateArea = styled.div`
  ${tw`font-medium mb-2 text-[#949494]`}
  font-size: 12px;
`;

const Hr = styled.hr`
  ${tw`mb-2`}
`;

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
