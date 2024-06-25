import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import { styled } from "styled-components";
import * as S from "../../styles/GlobalStyles";
import { fetchRegularAllowance, fetchAllowanceRequest, createDecision } from "../../services/allowance";
import { setRegularAllowance } from "../../store/reducers/Allowance/allowance";
import { format, differenceInDays } from "date-fns";
import { useSelector, useDispatch } from "react-redux";

import Header from "~/components/common/Header";
import RequestCard from "~/components/Allowance/RequestCard";
import RegularAllowanceCard from "~/components/Allowance/RegularAllowanceCard";
import EmptyImage from "~/assets/img/common/empty.svg";

const calculateDday = (createDate) => {
  const [year, month, day, hours, minutes, seconds] = createDate;
  const convertedCreateDate = new Date(year, month - 1, day, hours, minutes, seconds);

  const threeDaysLater = new Date(convertedCreateDate);
  threeDaysLater.setDate(threeDaysLater.getDate() + 3); // createDate에서 3일 후의 날짜

  const today = new Date();
  const dday = differenceInDays(threeDaysLater, today); // 오늘 날짜와 endDate 사이의 일 수 차이 계산

  return dday + 1;
};

const Management = () => {
  const [requestList, setRequestList] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedChildSn = useSelector((state) => state.user.selectedChildSn);
  const regularAllowance = useSelector((state) => state.allowance.regularAllowance);

  useEffect(() => {
    const fetchRegular = async () => {
      try {
        const regularAllowance = await fetchRegularAllowance(selectedChildSn);
        dispatch(setRegularAllowance(regularAllowance));
      } catch (error) {
        console.error("Error fetching regular allowance:", error);
      }
    };

    const fetchIrregular = async () => {
      try {
        const allowanceRequest = await fetchAllowanceRequest(selectedChildSn);
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

  const handleDecisionClick = async (id, accept) => {
    const message = accept ? "수락하시겠습니까?" : "거절하시겠습니까?";
    const confirmDecision = window.confirm(message);
    if (!confirmDecision) return;

    try {
      await createDecision(id, accept);
      setRequestList(requestList.filter((request) => request.id !== id));
    } catch (error) {
      console.error("Error accept allowance request:", error);
    }
  };

  return (
    <S.Container>
      <Header onLeftClick={handleLeftClick} title={"용돈"} right={""} />
      <Menu>
        <S.Phrase>정기용돈</S.Phrase>
        <S.HistoryLink onClick={handleHistoryClick}>지난 용돈 &gt;</S.HistoryLink>
      </Menu>
      <RegularAllowanceCard />
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
            <RequestCard key={index} id={request.id} dday={calculateDday(request.createDate)} allowance={request.amount} message={request.content} onClick={handleDecisionClick} />
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
