import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { fetchPortfolio } from "../../store/reducers/Invest/portfolio";
import {
  fetchInvestAccount,
  setAccountType,
} from "../../store/reducers/Account/account";
import { fetchLeftProposal } from "../../services/invest";

const InvestMain = () => {
  const dispatch = useDispatch();
  const selectedChildSn = useSelector((state) => state.user.selectedChildSn);
  const accountType = useSelector((state) => state.account.accountType);
  const [isDonut, setIsDonut] = useState(true);
  const [data, setData] = useState([]);

  const toggleShow = () => {
    setIsDonut(!isDonut);
  };

  useEffect(() => {
    dispatch(fetchPortfolio({ csn: selectedChildSn }));
  }, []);

  useEffect(() => {
    dispatch(setAccountType(2));
    dispatch(fetchInvestAccount({ csn: selectedChildSn }));
  }, [accountType]);

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  useEffect(() => {
    const fetchData = async (csn) => {
      try {
        const data = await fetchLeftProposal(csn);
        console.log(data);
        setData(data.response);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData(selectedChildSn);
  }, []);

  console.log(data);

  return (
    <S.Container>
      <Header />
      <CenterWrapper>
        {data.length !== 0 ? (
          <Slider {...sliderSettings}>
            {data.map((d) => (
              <RequestCard data={d} key={d.proposeId} />
            ))}
          </Slider>
        ) : (
          <></>
        )}

        <Page>
          <Account />
          {isDonut ? (
            <PortfolioDonut toggleShow={toggleShow} />
          ) : (
            <PortfolioList toggleShow={toggleShow} />
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
