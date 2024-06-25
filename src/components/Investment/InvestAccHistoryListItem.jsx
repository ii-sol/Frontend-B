import React from "react";
import tw from "twin.macro";
import { styled } from "styled-components";
import { useSelector } from "react-redux";
import { normalizeNumber } from "../../utils/normalizeNumber";

const InvestAccHistoryListItem = ({ data }) => {
  let trade;
  let balance;

  if ("stock" == data.senderName) {
    trade = 1;
    balance = data.receiverBalance;
  } else {
    trade = 2;
    balance = data.senderBalance;
  }

  const renderAmount = (code) => {
    if (code == 5) {
      return (
        <ItemAmount color="#FF4848">{normalizeNumber(data.amount)}</ItemAmount>
      );
    } else {
      return (
        <ItemAmount color="#5A74FF">{normalizeNumber(data.amount)}</ItemAmount>
      );
    }
  };
  console.log(data);

  const renderMessage = (messageCode) => {
    switch (messageCode) {
      case 5:
        return "구매";
      case 6:
        return "판매";
      default:
        return "알 수 없는 코드";
    }
  };
  return (
    <Container>
      <Wrapper>
        <ItemContent>{renderMessage(data.messageCode)}</ItemContent>
      </Wrapper>
      <AmountContainer>
        {renderAmount(data.messageCode)}
        <Balance>남은 돈: {normalizeNumber(balance)}원</Balance>
      </AmountContainer>
    </Container>
  );
};

export default InvestAccHistoryListItem;

const Container = styled.li`
  ${tw`flex justify-between items-center mb-5 border-b border-gray-200`}
`;

const Wrapper = styled.div`
  ${tw`flex flex-col items-start gap-2`}
  font-size: 20px;
`;

const ItemContent = styled.div``;

const ItemName = styled.div`
  ${tw`text-gray-500`}
  font-size: 15px;
`;

const AmountContainer = styled.div`
  ${tw`flex flex-col items-end gap-2`}
`;

const ItemAmount = styled.div`
  ${tw`font-semibold`}
  font-size:20px;
  color: ${({ color }) => (color ? color : "inherit")};
`;

const Balance = styled.div`
  ${tw`text-gray-500`}
  font-size: 15px;
`;
