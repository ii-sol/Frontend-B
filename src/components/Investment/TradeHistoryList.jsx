import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import { styled } from "styled-components";
import * as S from "../../styles/GlobalStyles";
import { useSelector } from "react-redux";
import EmptyImage from "~/assets/img/common/empty.svg";
import { normalizeNumber } from "../../utils/normalizeNumber";
import { groupDataByDate } from "../../utils/groupDataByDate";

const TradeHistoryList = () => {
  const status = useSelector((state) => state.history.status);
  const [data, setData] = useState([]);

  useEffect(() => {
    let updatedData;
    if (status === 0) {
      updatedData = [
        {
          tradeId: 0,
          code: "005930",
          name: "삼성전자",
          quantity: 3,
          price: 80000,
          createdDate: "2024-05-10",
          trade: 0,
        },
        {
          tradeId: 1,
          code: "000660",
          name: "SK하이닉스",
          quantity: 5,
          price: 120000,
          createdDate: "2024-05-12",
          trade: 0,
        },
        {
          tradeId: 2,
          code: "005380",
          name: "현대차",
          quantity: 2,
          price: 200000,
          createdDate: "2024-05-14",
          trade: 1,
        },
        {
          tradeId: 3,
          code: "051910",
          name: "LG화학",
          quantity: 1,
          price: 700000,
          createdDate: "2024-05-16",
          trade: 0,
        },
        {
          tradeId: 4,
          code: "035420",
          name: "NAVER",
          quantity: 4,
          price: 350000,
          createdDate: "2024-05-18",
          trade: 1,
        },
        {
          tradeId: 5,
          code: "005490",
          name: "POSCO",
          quantity: 3,
          price: 300000,
          createdDate: "2024-05-20",
          trade: 1,
        },
        {
          tradeId: 6,
          code: "000270",
          name: "기아",
          quantity: 6,
          price: 90000,
          createdDate: "2024-05-22",
          trade: 0,
        },
        {
          tradeId: 7,
          code: "005935",
          name: "삼성전자우",
          quantity: 2,
          price: 75000,
          createdDate: "2024-05-28",
          trade: 0,
        },
        {
          tradeId: 8,
          code: "035720",
          name: "카카오",
          quantity: 113,
          price: 100000,
          createdDate: "2024-05-28",
          trade: 0,
        },
        {
          tradeId: 9,
          code: "105560",
          name: "KB금융",
          quantity: 14,
          price: 50000,
          createdDate: "2024-05-28",
          trade: 0,
        },
      ];
    } else if (status === 1) {
      updatedData = [
        {
          tradeId: 2,
          code: "005380",
          name: "현대차",
          quantity: 2,
          price: 200000,
          createdDate: "2024-05-14",
          trade: 1,
        },
        {
          tradeId: 4,
          code: "035420",
          name: "NAVER",
          quantity: 4,
          price: 350000,
          createdDate: "2024-05-18",
          trade: 1,
        },
        {
          tradeId: 5,
          code: "005490",
          name: "POSCO",
          quantity: 3,
          price: 300000,
          createdDate: "2024-05-20",
          trade: 1,
        },
      ];
    } else if (status === 2) {
      updatedData = [
        {
          tradeId: 0,
          code: "005930",
          name: "삼성전자",
          quantity: 3,
          price: 80000,
          createdDate: "2024-05-10",
          trade: 0,
        },
        {
          tradeId: 1,
          code: "000660",
          name: "SK하이닉스",
          quantity: 5,
          price: 120000,
          createdDate: "2024-05-12",
          trade: 0,
        },
        {
          tradeId: 3,
          code: "051910",
          name: "LG화학",
          quantity: 1,
          price: 700000,
          createdDate: "2024-05-16",
          trade: 0,
        },
        {
          tradeId: 6,
          code: "000270",
          name: "기아",
          quantity: 6,
          price: 90000,
          createdDate: "2024-05-22",
          trade: 0,
        },
        {
          tradeId: 7,
          code: "005935",
          name: "삼성전자우",
          quantity: 2,
          price: 75000,
          createdDate: "2024-05-28",
          trade: 0,
        },
        {
          tradeId: 8,
          code: "035720",
          name: "카카오",
          quantity: 3,
          price: 100000,
          createdDate: "2024-05-28",
          trade: 0,
        },
        {
          tradeId: 9,
          code: "105560",
          name: "KB금융",
          quantity: 4,
          price: 50000,
          createdDate: "2024-05-28",
          trade: 0,
        },
      ];
    }
    setData(updatedData);
  }, [status]);

  const renderBadge = (status) => {
    switch (status) {
      case 0:
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

  const groupedData = groupDataByDate(data);
  const sortedGroupedData = Object.keys(groupedData).sort((a, b) => new Date(b) - new Date(a));

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
                <Wrapper key={d.tradeId}>
                  {renderBadge(d.trade)}
                  <RowDiv>
                    <S.ColumnDiv style={{ position: "relative" }}>
                      <Name>{d.name}</Name>
                      <Code style={{ position: "absolute", top: "25px" }}>{d.code}</Code>
                    </S.ColumnDiv>
                    <DetailDiv>
                      <Div>{normalizeNumber(d.price)}</Div>
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
