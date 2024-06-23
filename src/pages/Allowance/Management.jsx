import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import { styled } from "styled-components";
import * as S from "../../styles/GlobalStyles";
import { fetchRegularAllowance } from "../../services/allowance";

import Header from "~/components/common/Header";
import RequestCard from "~/components/Allowance/RequestCard";
import RegularAllowanceCard from "~/components/Allowance/RegularAllowanceCard";

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

    fetchRegular();
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
      <S.CardContainer>
        <RequestCard dday={"0"} allowance={1000} message={"과자 먹고 싶어요"} />
        <RequestCard dday={"3"} allowance={3000} message={"준비물 사야 해요"} />
        <RequestCard dday={"5"} allowance={1000} message={"과자 먹고 싶어요"} />
      </S.CardContainer>
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
