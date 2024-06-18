import React from "react";
import tw from "twin.macro";
import { styled } from "styled-components";

import Filter from "./Filter";
import { useLocation } from "react-router-dom";

import AllowanceHistory from "../../Allowance/HistoryListItem";
import AccountHistory from "../../Account/AccountHistoryListItem";
import MissionHistory from "../../Mission/MissionHistoryListItem";

const HistoryList = () => {
  const location = useLocation();
  return (
    <Container>
      <Filter></Filter>
      <List>
        {location.pathname === "/account/history" ? (
          <AccountHistory />
        ) : location.pathname === "/allowance/history" ? (
          <AllowanceHistory />
        ) : location.pathname === "/mission/history" ? (
          <MissionHistory />
        ) : (
          <></>
        )}
      </List>
    </Container>
  );
};

export default HistoryList;

const Container = styled.div`
  ${tw`flex flex-col w-full gap-4`}
`;

const List = styled.ul`
  ${tw`list-none p-0`}
`;
