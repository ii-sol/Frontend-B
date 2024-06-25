import React, { useState, useEffect } from "react";
import tw from "twin.macro";
import { styled } from "styled-components";

import EmptyImage from "~/assets/img/common/empty.svg";
import { groupDataByDate } from "../../utils/groupDataByDate";
import { useSelector } from "react-redux";
import InvestAccHistoryListItem from "./InvestAccHistoryListItem";
import { fetchChildHistory } from "../../services/account";

const InvestAccountHistoryList = () => {
  const selectedChildSn = useSelector((state) => state.user.selectedChildSn);
  const year = useSelector((state) => state.history.year);
  const month = useSelector((state) => state.history.month);
  console.log(month);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async (csn, year, month, status) => {
      try {
        const data = await fetchChildHistory(csn, year, month, status);
        setData(data.response);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData(selectedChildSn, year, month, 2);
  }, [year, month]);

  const groupedData = groupDataByDate(data);
  const sortedGroupedData = Object.keys(groupedData).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  console.log(groupedData);
  return (
    <Container>
      <List>
        {sortedGroupedData.length === 0 ? (
          <EmptyState>
            <Img src={EmptyImage} alt="No data" />
            <EmptyText>용돈 내역이 없어요</EmptyText>
          </EmptyState>
        ) : (
          sortedGroupedData.map((date, index) => (
            <DateGroup key={index}>
              <DateArea>{date}</DateArea>
              <Hr />
              {groupedData[date]
                .slice()
                .reverse()
                .map((item, index) => (
                  <InvestAccHistoryListItem key={index} data={item} />
                ))}
            </DateGroup>
          ))
        )}
      </List>
    </Container>
  );
};

export default InvestAccountHistoryList;

const Container = styled.div``;

const List = styled.ul`
  ${tw`list-none p-0`}
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

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
`;
