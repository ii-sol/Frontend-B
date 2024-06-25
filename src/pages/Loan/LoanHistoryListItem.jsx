import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import * as S from "../../styles/GlobalStyles";
import EmptyImage from "~/assets/img/common/empty.svg";
import LoanHistoryCard from "../../components/Loan/LoanHistoryCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { baseInstance } from "../../services/api.jsx";

const LoanHistoryListItem = () => {
  const [data, setData] = useState([]);
  const status = useSelector((state) => state.history.status);
  const year = useSelector((state) => state.history.year);
  const month = useSelector((state) => state.history.month);
  const selectedChildSn = useSelector((state) => state.user.selectedChildSn);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoanData = async () => {
      try {
        const response = await baseInstance.get(`/loan/${selectedChildSn}`);
        const data = response.data;

        if (data.success) {
          // Filter data by status
          const filteredByStatus = data.response.filter(
            (item) => item.status === 4 || item.status === 5
          );

          // Further filter data by the selected status, year, and month
          const filteredData = filteredByStatus.filter((item) => {
            const itemDate = new Date(item.createDate);
            const isSameYear = itemDate.getFullYear() === year;
            const isSameMonth = itemDate.getMonth() === month - 1;
            const isMatchingStatus = status === 0 || item.status == status; // Assuming status 0 means all statuses

            return isSameYear && isSameMonth && isMatchingStatus;
          });

          setData(filteredData);
        } else {
          console.error("Failed to fetch data:", data.error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchLoanData();
  }, [status, year, month]);

  const handleProgress = (loanId) => {
    navigate(`/loan/detailOnGoing/${loanId}`);
  };

  const renderItem = (item) => (
    <LoanHistoryCard
      key={item.id}
      status={item.status.toString()}
      title={item.title}
      createDate={new Date(item.createDate).toLocaleDateString()}
      dueDate={new Date(item.dueDate).toLocaleDateString()}
      amount={item.amount.toString()}
      onClick={() => handleProgress(item.id)}
    />
  );

  return (
    <Container>
      <List>
        {data.length === 0 ? (
          <EmptyState>
            <Img src={EmptyImage} alt="No data" />
            <EmptyText>대출 신청 내역이 없어요</EmptyText>
          </EmptyState>
        ) : (
          <S.CardContainer>
            {data.map((item) => renderItem(item))}
          </S.CardContainer>
        )}
      </List>
    </Container>
  );
};

export default LoanHistoryListItem;

const Container = styled.div``;

const List = styled.ul`
  ${tw`list-none p-0`}
`;

const EmptyState = styled.div`
  ${tw`flex flex-col items-center justify-center h-full mt-20`}
`;

const Img = styled.img`
  ${tw`h-auto mb-4`}
  width: 40%;
`;

const EmptyText = styled.div`
  ${tw`text-2xl`}
`;
