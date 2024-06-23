import React, { useState, useEffect } from "react";
import tw from "twin.macro";
import { styled } from "styled-components";
import * as S from "../../styles/GlobalStyles";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllowanceHistory } from "../../store/reducers/Allowance/allowance";
import { PuffLoader } from "react-spinners";

import RequestCardP from "~/components/Allowance/RequestCardP";
import RegularAllowanceHistoryCard from "~/components/Allowance/RegularAllowanceHistoryCard";

import CardImg from "~/assets/img/Allowance/allowanceRequest.svg";
import EmptyImage from "~/assets/img/common/empty.svg";

const HistoryListItem = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.allowance.data);
  const loading = useSelector((state) => state.allowance.loading);
  const { year, month } = useSelector((state) => state.history);
  const { status } = useSelector((state) => state.history);

  const selectedChildSn = useSelector((state) => state.user.selectedChildSn);

  useEffect(() => {
    dispatch(fetchAllowanceHistory({ year: year, month: month, csn: selectedChildSn }));
  }, [dispatch, year, month]);

  const renderItem = (item) => {
    if (item.status === 1) {
      return <RequestCardP key={item.id} allowance={item.amount} img={CardImg} message={item.content} />;
    } else if (item.status === 2) {
      return <RegularAllowanceHistoryCard key={item.id} allowance={item.amount} />;
    }
    return null;
  };

  return (
    <Container>
      <List>
        {loading ? (
          <LoadingState>
            <PuffLoader color="#4056c1" />
          </LoadingState>
        ) : (
          <>
            {data.length === 0 ? (
              <EmptyState>
                <Img src={EmptyImage} alt="No data" />
                <EmptyText>용돈 내역이 없어요</EmptyText>
              </EmptyState>
            ) : (
              <S.CardContainer>{data.map((item) => renderItem(item))}</S.CardContainer>
            )}
          </>
        )}
      </List>
    </Container>
  );
};

export default HistoryListItem;

const Container = styled.div``;

const List = styled.ul`
  ${tw`list-none p-0`}
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

const LoadingState = styled.div`
  ${tw`flex items-center justify-center h-full mt-20`}
`;
