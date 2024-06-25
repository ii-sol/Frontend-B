import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import { styled } from "styled-components";
import * as S from "../../styles/GlobalStyles";
import { useSelector } from "react-redux";
import EmptyImage from "~/assets/img/common/empty.svg";
import { normalizeNumber } from "../../utils/normalizeNumber";
import { fetchInvestHistory } from "../../services/invest";
import { groupDataByDatetwo } from "../../utils/groupDataByDatetwo";

const TradeHistoryList = () => {
  const status = useSelector((state) => state.history.status);
  const year = useSelector((state) => state.history.year);
  const month = useSelector((state) => state.history.month);
  const selectedChildSn = useSelector((state) => state.user.selectedChildSn);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async (status, csn, year, month) => {
      try {
        const data = await fetchInvestHistory(status, csn, year, month);
        console.log(data);
        setData(data.response);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData(status, selectedChildSn, year, month);
  }, [status, year, month]);

  const renderBadge = (status) => {
    switch (status) {
      case 2:
        return (
          <S.Badge $back="#D5E0F1" $font="#346BAC">
            판매
          </S.Badge>
        );
      case 1:
        return (
          <S.Badge $back="#FFDCDC" $font="#CC3535">
            구매
          </S.Badge>
        );
      default:
        return <div style={{ height: "30px" }}></div>;
    }
  };

  const groupedData = groupDataByDatetwo(data);
  const sortedGroupedData = Object.keys(groupedData).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  const isLastItem = (date, index) => {
    return index === groupedData[date].length - 1;
  };

  return (
    <Container>
      {Object.keys(groupedData).length === 0 ? (
        <EmptyState>
          <Img src={EmptyImage} alt="No data" />
          <EmptyText>거래 내역이 없어요</EmptyText>
        </EmptyState>
      ) : (
        <div>
          <DetailDiv
            style={{
              marginLeft: "auto",
              marginBottom: "-15px",
              color: "#949494",
            }}
          >
            <Div>단가</Div>
            <Div>수량</Div>
          </DetailDiv>
          {sortedGroupedData.map((date, index) => (
            <DateGroup key={index}>
              <DateArea>{date}</DateArea>
              <Hr />
              {groupedData[date].map((d, dIndex) => (
                <Wrapper key={dIndex}>
                  {renderBadge(d.tradingCode)}
                  <RowDiv>
                    <S.ColumnDiv style={{ position: "relative" }}>
                      <Name>{d.companyName}</Name>
                      <Code style={{ position: "absolute", top: "25px" }}>
                        {d.ticker}
                      </Code>
                    </S.ColumnDiv>
                    <DetailDiv>
                      <Div>{normalizeNumber(d.stockPrice)}</Div>
                      <Div>{d.quantity}주</Div>
                    </DetailDiv>
                  </RowDiv>
                  {isLastItem(date, dIndex) ? (
                    <div style={{ marginBottom: "100px" }}></div>
                  ) : (
                    <hr
                      style={{
                        marginTop: "30px",
                        background: "#d9d9d9",
                        height: "1px",
                        border: 0,
                      }}
                    />
                  )}
                </Wrapper>
              ))}
            </DateGroup>
          ))}
        </div>
      )}
    </Container>
  );
};

export default TradeHistoryList;

const Container = styled.div``;

const EmptyState = styled.div`
  ${tw`flex flex-col items-center justify-center h-full mt-20`}
`;

const Img = styled.img`
  ${tw`h-auto mb-4`}
  width: 40%;
`;

const EmptyText = styled.div`
  ${tw`text-2xl`}
`;

const DateGroup = styled.div`
  ${tw`mb-9`}
`;

const DateArea = styled.div`
  ${tw`font-medium mb-2 text-[#949494]`}
  font-size: 12px;
`;

const Hr = styled.hr`
  ${tw`mb-2`}
`;

const Wrapper = styled.div`
  margin: 0px 0px 7px 0px;
`;

const RowDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
`;

const Name = styled.div`
  font-size: 20px;
  font-weight: 600;
`;

const Code = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #949494;
`;

const DetailDiv = styled.div`
  display: flex;
  justify-content: end;
  width: 200px;
`;

const Div = styled.div`
  font-size: 17px;
  font-weight: 500;
  width: 50%;
  text-align: right;
`;
