import React, { useCallback, useEffect, useRef, useState } from "react";
import * as S from "../../styles/GlobalStyles";
import Header from "../../components/Investment/Header";
import { styled } from "styled-components";
import search from "../../assets/img/Invest/search.svg";
import filledStar from "../../assets/img/Invest/filledStar.svg";
import blankStar from "../../assets/img/Invest/blankStar.svg";

import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import StocksDetail from "../../components/Investment/StocksDetail";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMyStocks,
  setCode,
  setIsMyStock,
  setIsNew,
} from "../../store/reducers/Invest/invest";
import { searchStocks } from "../../services/invest";
import { normalizeNumber } from "../../utils/normalizeNumber";

const StockList = () => {
  const isMyStocks = useSelector((state) => state.invest.isMyStock);
  const selectedChildSn = useSelector((state) => state.user.selectedChildSn);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const handleDismiss = () => {
    setOpen(false);
  };

  const tradableStockList = useSelector(
    (state) => state.invest.tradableStockList
  );

  const [page, setPage] = useState(0);
  const size = 20;
  const [items, setItems] = useState([]);

  const fetchStocks = async (csn, corp, page, size) => {
    try {
      let data;
      if (corp.trim() === "") {
        data = await searchStocks(csn, "", page, size);
      } else {
        data = await searchStocks(csn, "/" + corp, page, size);
      }
      console.log(data);
      // setItems((prevItems) => [...prevItems, ...data.response]);
      const filteredData = data.response.filter((item) => item.canTrading);
      setItems((prevItems) => [...prevItems, ...filteredData]);
    } catch (err) {
      console.error(err);
    }
  };

  console.log(items);

  const onChangeInput = (e) => {
    const inputValue = e.target.value;
    setItems([]);
    setSearchInput(inputValue);
    setPage(0);
    setItems([]);
  };

  useEffect(() => {
    if (searchInput.trim() === "") {
      fetchStocks(selectedChildSn, searchInput, page, size);
    } else {
      const timer = setTimeout(() => {
        fetchStocks(selectedChildSn, searchInput, page, size);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [searchInput, page]);

  const containerRef = useRef(null);
  const handleScroll = useCallback(() => {
    if (
      containerRef.current &&
      containerRef.current.scrollTop + containerRef.current.clientHeight >=
        containerRef.current.scrollHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  useEffect(() => {
    dispatch(fetchMyStocks({ csn: selectedChildSn }));
    dispatch(setIsMyStock(tradableStockList.map((stock) => stock.ticker)));
  }, [tradableStockList.length]);

  return (
    <S.Container>
      <Header />
      <S.CenterDiv>
        <SearchWrapper>
          <Img src={search} />
          <SearchInput
            type="text"
            placeholder="종목명을 입력하세요!"
            value={searchInput}
            onChange={onChangeInput}
          />
        </SearchWrapper>
        <SearchResults ref={containerRef}>
          {items.map((result, index) => (
            <div key={index}>
              <SearchResult
                $isMyStock={result.myStock}
                $myStocksArr={isMyStocks}
                $nowStock={result.ticker}
                onClick={() => {
                  if (result.canTrading) {
                    setOpen(true);
                    dispatch(setCode(result.ticker));
                    if (result.myStock) {
                      dispatch(setIsNew(false));
                    } else {
                      dispatch(setIsNew(true));
                    }
                  }
                }}
              >
                <StockDiv>
                  <StockName>{result.companyName}</StockName>
                  <RowDiv>
                    <StockCode>{result.ticker}</StockCode>
                  </RowDiv>
                </StockDiv>
                {result.canTrading ? (
                  <S.RowDiv style={{ gap: 5 }}>
                    <S.ColumnDiv>
                      <PriceDiv $isPositive={result.changePrice}>
                        {parseInt(result.currentPrice)}원
                      </PriceDiv>
                      <PriceDiv $isPositive={result.changePrice}>
                        {result.changePrice > 0
                          ? `▲ ${normalizeNumber(result.changePrice)}원`
                          : result.changePrice < 0
                          ? `▼ ${normalizeNumber(result.changePrice)}원`
                          : `${normalizeNumber(result.changePrice)}원`}
                        &nbsp;
                        {result.changeRate > 0
                          ? `(+${parseFloat(result.changeRate).toFixed(2)}%)`
                          : `(${parseFloat(result.changeRate).toFixed(2)}%)`}
                      </PriceDiv>
                    </S.ColumnDiv>
                  </S.RowDiv>
                ) : (
                  <></>
                )}
              </SearchResult>
              <hr
                style={{
                  background: "#d9d9d9",
                  height: "1px",
                  border: 0,
                  margin: "0px",
                }}
              />
            </div>
          ))}
          <BottomSheet open={open} onDismiss={handleDismiss}>
            <StocksDetail onDismiss={handleDismiss} />
          </BottomSheet>
        </SearchResults>
      </S.CenterDiv>
    </S.Container>
  );
};

export default StockList;

const SearchWrapper = styled.label`
  position: relative;
  display: flex;
  width: 100%;
  padding: 10px;
  height: 50px;
  background-color: #f3f3f3;
`;

const Img = styled.img`
  position: absolute;
  top: 13px;
  left: 18px;
  font-size: 30px;
`;

const SearchInput = styled.input`
  width: 85%;
  padding-left: 40px;
  font-size: 20px;
  border: none;
  background-color: #f3f3f3;
`;

const SearchResults = styled.ul`
  width: 100%;
  max-height: calc(100vh - 158px);
  height: calc(100vh - 158px);
  overflow: auto;
  padding-bottom: 5px;
  background-color: white;
`;

const SearchResult = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 10px;
  text-align: left;
  min-height: 60px;
  cursor: pointer;
  background-color: ${({ $myStocksArr, $nowStock, $isMyStock }) =>
    $myStocksArr.includes($nowStock)
      ? "#daecff"
      : // : $isMyStock
        // ? "#daecff"
        "white"};
`;

const StockDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const StockName = styled.div`
  color: #000;
  font-size: 16px;
`;

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  color: #8c8c8c;
  font-size: 12px;
`;

const StockCode = styled.div`
  margin-right: 3px;
`;

const StarImg = styled.img`
  width: 25px;
`;

const PriceDiv = styled.div`
  color: ${({ $isPositive }) =>
    $isPositive > 0 ? "#EE3124" : $isPositive < 0 ? "#154B9B" : "#000000"};
  text-align: right;
`;
