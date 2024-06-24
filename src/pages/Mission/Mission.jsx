import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import { styled } from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as S from "../../styles/GlobalStyles";
import { fetchOngoingMissions, fetchPendingMissions } from "../../services/mission";
import { useSelector } from "react-redux";

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
  const [ongoingMissions, setOngoingMissions] = useState([]);
  const [pendingMissions, setPendingMissions] = useState([]);
  const navigate = useNavigate();

  const sn = useSelector((state) => state.user.userInfo.sn);

  const handleLeftClick = () => {
    navigate("/");
  };

  useEffect(() => {
    const fetchOngoing = async () => {
      try {
        const data = await fetchOngoingMissions(sn);
        setOngoingMissions(data);
      } catch (error) {
        console.error("Error fetching ongoing missions:", error);
      }
    };

    const fetchPending = async () => {
      try {
        const data = await fetchPendingMissions(sn);
        setPendingMissions(data);
      } catch (error) {
        console.error("Error fetching pending missions:", error);
      }
    };

    fetchOngoing();
    fetchPending();
  }, [sn]);

  const handleRequestProgress = (id, status) => {
    if (status === 2) {
      navigate(`/mission/request/receive/${id}`);
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
                  name={mission.parentName} //TODO: 보낸 사람 이름 넣어야 함
                  content={mission.content}
                  dday={calculateDday(mission.createDate)}
                  onClick={() => handleRequestProgress(mission.id, mission.status)}
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
          {ongoingMissions.map((mission) => (
            <MissionCard key={mission.id} id={mission.id} status={mission.status} dday={calculateDday(mission.createDate)} mission={mission.content} allowance={mission.price} />
          ))}
          <MissionCard status={6} mission="설거지하기" allowance="10000" />
          <MissionCard dday="3" mission="설거지하기" allowance="10000" />
          <MissionCard dday="0" mission="설거지하기" allowance="10000" />
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
