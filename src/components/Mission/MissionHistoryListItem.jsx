import React, { useEffect } from "react";
import tw from "twin.macro";
import { styled } from "styled-components";
import * as S from "../../styles/GlobalStyles";
import { useSelector, useDispatch } from "react-redux";
import { fetchMissionHistory } from "../../services/mission";
import { setHistoryData } from "../../store/reducers/Mission/mission";
import { PuffLoader } from "react-spinners";

import MissionCard from "./MissionCard";

import MissionImage from "~/assets/img/common/happySol.svg";
import EmptyImage from "~/assets/img/common/empty.svg";

const MissionHistoryListItem = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.mission.historyData);
  const loading = useSelector((state) => state.mission.loading);
  const { year, month, status } = useSelector((state) => state.history);

  const sn = useSelector((state) => state.user.selectedChildSn);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const responseData = await fetchMissionHistory(sn, year, month, status);
        dispatch(setHistoryData(responseData));
      } catch (error) {
        console.error("Error fetching mission history:", error);
      }
    };

    fetchHistory();
  }, [dispatch, year, month, status, sn]);

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
                <EmptyText>미션 내역이 없어요</EmptyText>
              </EmptyState>
            ) : (
              <S.CardContainer>
                {data.map((item) => (
                  <MissionCard
                    key={item.id}
                    status={item.status}
                    mission={item.content}
                    allowance={item.allowance}
                  />
                ))}
              </S.CardContainer>
            )}
          </>
        )}
      </List>
    </Container>
  );
};

export default MissionHistoryListItem;

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
