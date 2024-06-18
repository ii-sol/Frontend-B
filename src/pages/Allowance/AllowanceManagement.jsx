import React from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import { styled } from "styled-components";
import * as S from "../../styles/GlobalStyles";

import Header from "~/components/common/Header";
import RequestCard from "~/components/Allowance/RequestCard";
import RegularAllowanceCard from "~/components/Allowance/RegularAllowanceCard";

const AllowanceManagement = () => {
  const navigate = useNavigate();

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
      <RegularAllowanceCard period="1개월" allowance="100000" startDate={"2024.05.12"} endDate={"2024.06.12"} role={"parent"} />
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

export default AllowanceManagement;

const Menu = styled.div`
  ${tw`
  grid
  mb-2
  items-center
  `}
  grid-template-columns: auto auto;
`;
