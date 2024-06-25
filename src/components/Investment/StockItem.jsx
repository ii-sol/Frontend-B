import React, { useRef, useState } from "react";
import { ThemeProvider, styled } from "styled-components";
import { FaRegTrashAlt } from "react-icons/fa";
import { onTouchStart, onTouchEnd } from "../../utils/touchDeleteHandler.jsx";
import { normalizeNumber } from "../../utils/normalizeNumber.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMyStocks,
  setCode,
  setIsNew,
} from "../../store/reducers/Invest/invest.jsx";

const StockItem = ({ stock, setOpen, onClick }) => {
  const dispatch = useDispatch();
  const ref = useRef();
  const [startX, setStartX] = useState(0);
  const selectedChildSn = useSelector((state) => state.user.selectedChildSn);

  const handleClick = () => {
    onClick();
    dispatch(setCode(stock.ticker));
    dispatch(setIsNew(false));
    setTimeout(() => {
      setOpen(true);
    }, 250);
  };

  const theme = {
    stock,
  };

  const onDelete = (ticker) => {
    if (ref.current) {
      ref.current.style.transform = "translateX(0px)";
      ref.current.style.transition = "none";
    }

    dispatch(deleteMyStocks({ csn: selectedChildSn, ticker: ticker })).then(
      () => {
        if (ref.current) {
          setTimeout(() => {
            ref.current.style.transition = "transform 1000ms";
          }, 0);
        }
      }
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <RowDiv>
        <DeleteDiv onClick={() => onDelete(stock.ticker)}>
          <FaRegTrashAlt size="30" />
        </DeleteDiv>
        <Wrapper
          ref={ref}
          onTouchStart={(e) => onTouchStart(e, ref, setStartX)}
          onTouchEnd={() => onTouchEnd(ref)}
          onClick={handleClick}
        >
          <StockDiv>
            <StockName>{stock.companyName}</StockName>
            <StockName style={{ fontSize: "15px" }}>{stock.ticker}</StockName>
          </StockDiv>
          <HoldingDiv>
            <CurrentPrice>{parseInt(stock.currentPrice)}</CurrentPrice>
            <ChangeRate>
              {stock.changePrice > 0
                ? `▲ ${normalizeNumber(parseFloat(stock.changePrice) * 100)}`
                : stock.changePrice < 0
                ? `▼ ${normalizeNumber(parseFloat(stock.changePrice) * 100)}`
                : `${normalizeNumber(parseFloat(stock.changePrice) * 100)}`}
              &nbsp;
              {stock.profit > 0
                ? `(+${parseFloat(stock.changeRate).toFixed(2)}%)`
                : `(${parseFloat(stock.changeRate).toFixed(2)}%)`}
            </ChangeRate>
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
    theme.stock.changePrice < 0
      ? "#dceeff"
      : theme.stock.changePrice > 0
      ? "#FFE6F1"
      : "#ebebeb"};
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
  gap: 0px;
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
  color: ${({ theme }) =>
    theme.stock.changePrice < 0
      ? "#154b9b"
      : theme.stock.changePrice > 0
      ? "#E84040"
      : "#000000"};
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
