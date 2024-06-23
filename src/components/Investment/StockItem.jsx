import React, { useRef, useState } from "react";
import { ThemeProvider, styled } from "styled-components";
import { FaRegTrashAlt } from "react-icons/fa";
import { onTouchStart, onTouchEnd } from "../../utils/touchDeleteHandler.jsx";

const StockItem = ({ stock, setOpen, onClick }) => {
  const ref = useRef();
  const [startX, setStartX] = useState(0);

  const handleClick = () => {
    onClick();
    setOpen(true);
  };

  const theme = {
    stock,
  };

  return (
    <ThemeProvider theme={theme}>
      <RowDiv>
        <DeleteDiv>
          <FaRegTrashAlt size="30" />
        </DeleteDiv>
        <Wrapper
          ref={ref}
          onTouchStart={(e) => onTouchStart(e, ref, setStartX)}
          onTouchEnd={() => onTouchEnd(ref)}
          onClick={handleClick}
        >
          <StockDiv>
            <StockName>{stock.name}</StockName>
          </StockDiv>
          <HoldingDiv>
            <CurrentPrice>{stock.price}</CurrentPrice>
            <ChangeRate>{stock.change}</ChangeRate>
          </HoldingDiv>
        </Wrapper>
      </RowDiv>
    </ThemeProvider>
  );
};

export default StockItem;

const RowDiv = styled.div`
  position: relative;
  width: 100%;
  display: flex;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) =>
    theme.stock.change < 0 ? "#dceeff" : "#FFE6F1"};
  border-radius: 15px;
  padding: 15px;
  height: 80px;
  margin-bottom: 10px;
  flex: 1 0 100%;
  transition: transform 800ms;
  transform: translateX(0px);
`;

const StockDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 1;
`;

const StockName = styled.div`
  font-size: 25px;
`;

const CurrentPrice = styled.div`
  font-size: 25px;
`;

const ChangeRate = styled.div`
  font-size: 17px;
  text-align: right;
`;

const HoldingDiv = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => (theme.stock.change < 0 ? "#154b9b" : "#E84040")};
  gap: 5px;
  flex: 1;
  text-align: right;
`;

const DeleteDiv = styled.div`
  position: absolute;
  right: 0px;
  top: 45%;
  transform: translateY(-50%);
  text-align: left;
  min-width: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
