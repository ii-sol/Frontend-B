import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import { styled } from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as S from "../../styles/GlobalStyles";
import { fetchOngoingMissions, fetchPendingMissions } from "../../services/mission";
import { calculateMissionDday } from "../../utils/calculateMissionDday";
import { useSelector, useDispatch } from "react-redux";
import { setOngoingData } from "../../store/reducers/Mission/mission";
import { format, differenceInDays } from "date-fns";

import Header from "~/components/common/Header";
import MissionCard from "../../components/Mission/MissionCard";
import RequestCard from "../../components/Mission/RequestCard";

const sliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
};

const Mission = () => {
  const [pendingMissions, setPendingMissions] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const childSn = useSelector((state) => state.user.selectedChildSn);
  const familyInfo = useSelector((state) => state.user.userInfo.familyInfo);
  const ongoingMissions = useSelector((state) => state.mission.ongoingData);

  const handleLeftClick = () => {
    navigate("/");
  };

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const ongoingData = await fetchOngoingMissions(childSn);
        dispatch(setOngoingData(ongoingData));

        const pendingData = await fetchPendingMissions(childSn);

        const mappedPendingMissions = pendingData.map((mission) => {
          const child = familyInfo.find((member) => member.sn === mission.childSn);
          return {
            ...mission,
            childName: child ? child.name : "미확인",
          };
        });
        setPendingMissions(mappedPendingMissions.reverse());
      } catch (error) {
        console.error("Error fetching missions:", error);
      }
    };

    fetchMissions();
  }, [childSn, familyInfo.name, dispatch]);

  const handleRequestProgress = (id, status, name) => {
    if (status === 1) {
      navigate(`/mission/request/receive/${id}`, { state: { name } });
    }
  };

  const handleHistoryClick = () => {
    navigate("/mission/history");
  };

  const handleRequestClick = () => {
    navigate("/mission/create");
  };

  const calculateDday = (createDate) => {
    const threeDaysLater = new Date(createDate);
    threeDaysLater.setDate(threeDaysLater.getDate() + 3); // createDate에서 3일 후의 날짜

    const today = new Date();
    const dday = differenceInDays(threeDaysLater, today); // 오늘 날짜와 endDate 사이의 일 수 차이 계산

    return dday;
  };

  const sortedOngoingMissions = ongoingMissions
    .map((mission) => ({
      ...mission,
      dday: calculateMissionDday(mission.createDate),
    }))
    .sort((a, b) => {
      if (a.status === 6 && b.status !== 6) return -1;
      if (a.status !== 6 && b.status === 6) return 1;
      return a.dday - b.dday;
    });

  return (
    <div>
      <S.Container>
        <Header left={"<"} onLeftClick={handleLeftClick} title={"미션"} />
        <Wrapper>
          {pendingMissions.length > 0 ? (
            <Slider {...sliderSettings}>
              {pendingMissions.map((mission) => (
                <RequestCard
                  key={mission.id}
                  status={mission.status}
                  name={mission.childName}
                  content={mission.content}
                  dday={calculateDday(mission.createDate)}
                  onClick={() => handleRequestProgress(mission.id, mission.status, mission.childName)}
                />
              ))}
            </Slider>
          ) : (
            <EmptyRequestContainer>
              <span>대기 중인 미션이 없습니다.</span>
            </EmptyRequestContainer>
          )}
        </Wrapper>

        <Menu>
          <S.Phrase>진행 중</S.Phrase>
          <S.HistoryLink onClick={handleHistoryClick}>지난 미션 &gt;</S.HistoryLink>
        </Menu>
        <S.CardContainer>
          <RegisterButton onClick={handleRequestClick}>
            <span tw="text-[#346BAC]">미션</span>요청하기
          </RegisterButton>
          {sortedOngoingMissions.map((mission) => (
            <MissionCard key={mission.id} id={mission.id} status={mission.status} dday={calculateMissionDday(mission.dueDate)} mission={mission.content} allowance={mission.price} />
          ))}
        </S.CardContainer>
      </S.Container>
    </div>
  );
};

export default Mission;

const RegisterButton = styled.button`
  ${tw`
  flex
  flex-col
  justify-center
  items-center
  p-5
  `}
  width: 148px;
  height: 232px;
  border-radius: 20px;
  background-color: rgba(151, 178, 221, 0.4);
  box-shadow: 0px 0px 15px 0px rgba(151, 178, 221, 0.4);
  font-size: 20px;
  font-weight: 700;
`;

const Menu = styled.div`
  ${tw`
  grid
  mb-2
  items-center
  `}
  grid-template-columns: auto auto;
`;

const Wrapper = styled.div`
  ${tw`w-full rounded-2xl p-2`}
  .slick-prev:before,
  .slick-next:before {
    font-family: "slick";
    font-size: 20px;
    line-height: 1;

    opacity: 0.75;
    color: #97b2dd;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .slick-prev.slick-disabled:before,
  .slick-next.slick-disabled:before {
    opacity: 0.2;
  }
`;

const EmptyRequestContainer = styled.div`
  ${tw`flex items-center justify-center bg-[#E9F2FF] w-full h-[88px] rounded-2xl text-lg p-4 my-4`}

  span {
    ${tw`
      text-lg
      font-semibold
      text-gray-600
    `}
  }
`;
