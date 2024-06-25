import React from "react";
import { useSelector } from "react-redux";
import { styled } from "styled-components";

//TODO: N/A null
const Indicator = () => {
  const marketCapitalization = useSelector(
    (state) => state.invest.indi.marketCapitalization
  );
  const dividendYield = useSelector((state) => state.invest.indi.dividendYield);
  const pbr = useSelector((state) => state.invest.indi.pbr);
  const per = useSelector((state) => state.invest.indi.per);
  const profitGrowth = useSelector((state) => state.invest.indi.profitGrowth);
  const roe = useSelector((state) => state.invest.indi.roe);

  const formattedMarketCapitalization = marketCapitalization
    .split(" ")
    .map((word, index) => (
      <React.Fragment key={index}>
        {word}
        {index < marketCapitalization.split(" ").length - 1 && <br />}
      </React.Fragment>
    ));

  return (
    <div>
      <RowDiv>
        <BoxDiv>
          <AboutDiv>시가총액</AboutDiv>
          <ContentDiv>{formattedMarketCapitalization}</ContentDiv>
        </BoxDiv>
        <BoxDiv>
          <AboutDiv>배당수익률</AboutDiv>
          <ContentDiv>{dividendYield}</ContentDiv>
        </BoxDiv>
        <BoxDiv>
          <AboutDiv>PBR</AboutDiv>
          <ContentDiv>{pbr}</ContentDiv>
        </BoxDiv>
      </RowDiv>
      <RowDiv>
        <BoxDiv>
          <AboutDiv>PER</AboutDiv>
          <ContentDiv>{per}</ContentDiv>
        </BoxDiv>
        <BoxDiv>
          <AboutDiv>ROE</AboutDiv>
          <ContentDiv>{roe}</ContentDiv>
        </BoxDiv>
        <BoxDiv>
          <AboutDiv>엽업증가율</AboutDiv>
          <ContentDiv>{profitGrowth}</ContentDiv>
        </BoxDiv>
      </RowDiv>
    </div>
  );
};

export default Indicator;

const RowDiv = styled.div`
  display: flex;
  justify-content: ${(props) =>
    props.$center ? props.$center : "space-between"};
  align-items: center;
  margin-top: ${(props) => (props.$top ? props.$top : "10")}px;
  gap: ${(props) => (props.$gap ? props.$gap : "10")}px;
`;

const BoxDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3px;
  width: 106px;
  height: 75px;
  border-radius: 15px;
  background: #ebf5ff;
`;

const AboutDiv = styled.div`
  color: #6a6a6a;
  font-size: 13px;
`;

const ContentDiv = styled.div`
  font-size: 14px;
  text-align: center;
`;
