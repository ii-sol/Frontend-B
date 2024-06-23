import React, { useState } from "react";
import Header from "../../components/Investment/Header";
import Account from "../../components/common/Account";
import { styled } from "styled-components";
import PortfolioDonut from "../../components/Investment/PortfolioDonut";
import PortfolioList from "../../components/Investment/PortfolioList";
import * as S from "../../styles/GlobalStyles";
import RequestCard from "../../components/Investment/RequestCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const InvestMain = () => {
  const [isDonut, setIsDonut] = useState(true);
  const [height, setHeight] = useState(0);

  const toggleShow = () => {
    setIsDonut(!isDonut);
  };

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <S.Container>
      <Header />
      <CenterWrapper>
        <Slider {...sliderSettings}>
          <RequestCard />
          <RequestCard />
        </Slider>
        <Page>
          <Account accountNum={1} />
          {isDonut ? (
            <PortfolioDonut toggleShow={toggleShow} setHeight={setHeight} />
          ) : (
            <PortfolioList toggleShow={toggleShow} height={height} />
          )}
        </Page>
      </CenterWrapper>
    </S.Container>
  );
};

export default InvestMain;

const CenterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

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

const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;
