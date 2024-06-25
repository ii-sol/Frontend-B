import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import { styled } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import EmptyImage from "~/assets/img/common/empty.svg";
import SuggestHistoryListItem from "./SuggestHistoryListItem";
import { groupDataByDatetwo } from "../../utils/groupDataByDatetwo";
import { fetchProposal } from "../../services/invest";
import {
  setMonth,
  setStatus,
  setYear,
} from "../../store/reducers/common/history";

const SuggestHistoryList = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.history.status);
  const year = useSelector((state) => state.history.year);
  const month = useSelector((state) => state.history.month);
  const selectedChildSn = useSelector((state) => state.user.selectedChildSn);
  const [data, setData] = useState([]);

  const fetchProposals = async () => {
    try {
      if (status === 0) {
        const data = await fetchProposal(0, selectedChildSn, year, month);
        setData(data.response);
      } else if (status === 1) {
        const [data1, data2] = await Promise.all([
          fetchProposal(3, selectedChildSn, year, month),
          fetchProposal(4, selectedChildSn, year, month),
        ]);
        setData([...data1.response, ...data2.response]);
      } else if (status === 2) {
        const data = await fetchProposal(1, selectedChildSn, year, month);
        setData(data.response);
      } else if (status === 3) {
        const data = await fetchProposal(5, selectedChildSn, year, month);
        setData(data.response);
      }
    } catch (err) {
      console.error(err);
    }
  };
  console.log(data);
  useEffect(() => {
    const currentDate = new Date();
    dispatch(setYear(currentDate.getFullYear()));
    dispatch(setMonth(currentDate.getMonth() + 1));
    dispatch(setStatus(0));
  }, []);

  useEffect(() => {
    fetchProposals();
  }, [status, year, month]);

  const groupedData = groupDataByDatetwo(data);
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
