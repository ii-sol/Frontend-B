import React, { useRef } from "react";
import { ThemeProvider, styled } from "styled-components";
import { FaRegTrashAlt } from "react-icons/fa";

const StockItem = ({ stock, setOpen, setSelectedStockId }) => {
  const ref = useRef();
  let startX;

  const onTouchMove = (e) => {
    const touch = e.touches[0];
    const moveX = touch.clientX;

    if (startX - moveX > 30) {
      ref.current.style.transform = "translateX(-55px)";
      setTimeout(() => {
        if (ref.current) ref.current.style.transform = "translateX(0px)";
      }, 2500);
    } else {
      ref.current.style.transform = "translateX(0px)";
    }
  };

  const onTouchStart = (e) => {
    const touch = e.touches[0];
    startX = touch.clientX;
    ref.current.addEventListener("touchmove", onTouchMove, { passive: true });
  };

  const onTouchEnd = () =>
    ref.current.removeEventListener("touchmove", onTouchMove);

  const handleClick = () => {
    setOpen(true);
    setSelectedStockId(stock.id);
  };

  const theme = {
    stock,
  };
  return (
    <ThemeProvider theme={theme}>
      <RowDiv>
        <Wrapper
          ref={ref}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onClick={handleClick}
        >
          <StockDiv>
            <StockName>{stock.title}</StockName>
          </StockDiv>
          <HoldingDiv>
            <CurrentPrice>{stock.price}</CurrentPrice>
            <ChangeRate>{stock.change}</ChangeRate>
          </HoldingDiv>
        </Wrapper>
        <DeleteDiv>
          <FaRegTrashAlt size="30" />
        </DeleteDiv>
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
  top: 25px;
  text-align: left;
  min-width: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: -999;
`;
