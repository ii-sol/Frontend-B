import React from "react";
import tw from "twin.macro";
import { styled } from "styled-components";

const HistoryListItem = ({ id, content, amount, balance }) => {
  const renderAmount = (amount) => {
    if (amount > 0) {
      return <ItemAmount color="#FF4848">+{amount}</ItemAmount>;
    } else if (amount < 0) {
      return <ItemAmount color="#5A74FF">{amount}</ItemAmount>;
    } else {
      return <ItemAmount>{amount}</ItemAmount>;
    }
  };

  return (
    <Container>
      <ItemContent>{content}</ItemContent>
      <AmountContainer>
        {renderAmount(amount)}
        <Balance>남은 돈: {balance}</Balance>
      </AmountContainer>
    </Container>
  );
};

export default HistoryListItem;

const Container = styled.li`
  ${tw`flex justify-between items-center mb-5 border-b border-gray-200`}
`;

const ItemContent = styled.div`
  ${tw`flex-1`}
  font-size: 18px;
`;

const AmountContainer = styled.div`
  ${tw`flex flex-col items-end gap-2`}
`;

const ItemAmount = styled.div`
  ${tw`font-semibold`}
  color: ${({ color }) => (color ? color : "inherit")};
`;

const Balance = styled.div`
  ${tw`text-gray-500`}
`;
