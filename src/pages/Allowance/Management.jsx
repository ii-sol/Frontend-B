import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import { styled } from "styled-components";
import * as S from "../../styles/GlobalStyles";
import { fetchRegularAllowance, fetchAllowanceRequest } from "../../services/allowance";

import Header from "~/components/common/Header";
import RequestCard from "~/components/Allowance/RequestCard";
import RegularAllowanceCard from "~/components/Allowance/RegularAllowanceCard";
import EmptyImage from "~/assets/img/common/empty.svg";

const calculateDday = (createDate) => {
  const threeDaysLater = new Date(createDate);
  threeDaysLater.setDate(threeDaysLater.getDate() + 3); // createDate에서 3일 후의 날짜

  const today = new Date();
  const dday = differenceInDays(threeDaysLater, today); // 오늘 날짜와 endDate 사이의 일 수 차이 계산

  return dday;
};

const Management = () => {
  const [regularAllowance, setRegularAllowance] = useState(null);
  const [requestList, setRequestList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRegular = async () => {
      try {
        const regularAllowance = await fetchRegularAllowance(7730362896);
        setRegularAllowance(regularAllowance);
      } catch (error) {
        console.error("Error fetching regular allowance:", error);
      }
    };

    const fetchIrregular = async () => {
      try {
        const allowanceRequest = await fetchAllowanceRequest(7730362896);
        setRequestList(allowanceRequest);
      } catch (error) {
        console.error("Error fetching regular allowance:", error);
      }
    };

    fetchRegular();
    fetchIrregular();
  }, []);

  const handleLeftClick = () => {
    navigate("/");
  };

  const handleHistoryClick = () => {
    navigate("/allowance/history");
  };

  return (
    <S.Container>
      <Header onLeftClick={handleLeftClick} title={"용돈"} right={""} />
      <Menu>
        <S.Phrase>정기용돈</S.Phrase>
        <S.HistoryLink onClick={handleHistoryClick}>지난 용돈 &gt;</S.HistoryLink>
      </Menu>
      <RegularAllowanceCard regularAllowance={regularAllowance} />
      <Menu>
        <S.Phrase>용돈 조르기</S.Phrase>
      </Menu>

      {requestList.length === 0 ? (
        <EmptyState>
          <Img src={EmptyImage} alt="No data" />
          <EmptyText>용돈 조르기 내역이 없어요</EmptyText>
        </EmptyState>
      ) : (
        <S.CardContainer>
          {requestList.map((request, index) => (
            <RequestCard key={index} dday={calculateDday(request.createDate)} allowance={request.amount} message={request.content} />
          ))}
        </S.CardContainer>
      )}
    </S.Container>
  );
};

export default Management;

const Menu = styled.div`
  ${tw`
  grid
  mb-2
  items-center
  `}
  grid-template-columns: auto auto;
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
