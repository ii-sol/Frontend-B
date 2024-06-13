import React from "react";
import tw from "twin.macro";
import { styled } from "styled-components";

import Header from "~/components/common/Header";
import RequestCardParent from "../../../components/Allowance/RequestCardParent";
import RegularAllowanceCard from "../../../components/Allowance/RegularAllowanceCard";

const AllowanceManagement = () => {
  return (
    <Container>
      <Header left={"<"} title={"용돈"} right={""} />
      <Menu>
        <Phrase>정기용돈</Phrase>
        <History>지난 용돈 &gt;</History>
      </Menu>
      <RegularAllowanceCard period="1개월" allowance="100000" startDate={"2024.05.12"} endDate={"2024.06.12"} />
      <Menu>
        <Phrase>조르기 내역</Phrase>
      </Menu>
      <CardContainer>
        <RequestCardParent allowance={1000} message={"과자 먹고 싶어요"} />
        <RequestCardParent allowance={3000} message={"준비물 사야 해요"} />
        <RequestCardParent allowance={1000} message={"과자 먹고 싶어요"} />
      </CardContainer>
    </Container>
  );
};

export default AllowanceManagement;

const Container = styled.div``;

const Menu = styled.div`
  ${tw`
  grid
  mb-2
  items-center
  `}
  grid-template-columns: auto auto;
`;

const Phrase = tw.div`
  text-lg
  font-bold
  justify-center
  my-2
  justify-self-start
`;

const History = tw.div`
  text-sm
  justify-self-end
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
`;
