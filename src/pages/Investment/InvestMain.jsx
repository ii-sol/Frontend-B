import React, { useState } from "react";
import Header from "../../components/Investment/Header";
import Account from "../../components/common/Account";
import { styled } from "styled-components";
import PortfolioDonut from "../../components/Investment/PortfolioDonut";
import PortfolioList from "../../components/Investment/PortfolioList";
import * as S from "../../styles/GlobalStyles";

const InvestMain = () => {
  const [isDonut, setIsDonut] = useState(true);
  const [height, setHeight] = useState(0);
  const [selectedPage, setSelectedPage] = useState(1);

  const toggleShow = () => {
    setIsDonut(!isDonut);
  };

  return (
    <S.Container>
      <Header />
      <CenterWrapper>
        <RowDiv>
          <SelectBtn
            $isSelected={selectedPage === 1}
            onClick={() => setSelectedPage(1)}
          >
            ●
          </SelectBtn>
          <SelectBtn
            $isSelected={selectedPage === 2}
            onClick={() => setSelectedPage(2)}
          >
            ●
          </SelectBtn>
        </RowDiv>
        {selectedPage === 1 ? (
          <Page>
            <Account accountNum={2} />
            {isDonut ? (
              <PortfolioDonut toggleShow={toggleShow} setHeight={setHeight} />
            ) : (
              <PortfolioList toggleShow={toggleShow} height={height} />
            )}
          </Page>
        ) : (
          <Page>
            <Account accountNum={3} />
            {isDonut ? (
              <PortfolioDonut toggleShow={toggleShow} setHeight={setHeight} />
            ) : (
              <PortfolioList toggleShow={toggleShow} height={height} />
            )}
          </Page>
        )}
      </CenterWrapper>
    </S.Container>
  );
};

export default InvestMain;

const CenterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const RowDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const SelectBtn = styled.button`
  color: ${(props) => (props.$isSelected ? "black" : "#afafaf")};
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
`;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;
