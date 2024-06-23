import { baseInstance } from "./api";

export const fetchStock = async (code, pathVariable) => {
  const baseUrl = `/stocks/${code}/${pathVariable}`;
  try {
    const response = await baseInstance.get(baseUrl);
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const fetchPortfolio = async () => {
  const baseUrl = `/invest/portfolio`;
  try {
    const response = await baseInstance.get(baseUrl);
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const fetchInvestHistory = async (status) => {
  const baseUrl = `/invest/history/${status}`;
  try {
    const response = await baseInstance.get(baseUrl);
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const fetchMyStocks = async () => {
  const baseUrl = `/my-stocks`;
  try {
    const response = await baseInstance.get(baseUrl);
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const deleteMyStocks = async (ticker) => {
  const baseUrl = `/my-stocks?ticker=${ticker}`;
  try {
    const response = await baseInstance.delete(baseUrl);
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const postInvest = async (trading, ticker, quantity) => {
  const baseUrl = `/invest`;
  try {
    const response = await baseInstance.post(baseUrl, {
      trading,
      ticker,
      quantity,
    });
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const postProposal = async (
  psn,
  ticker,
  message,
  quantity,
  tradingCode
) => {
  const baseUrl = `/proposal/invest/${psn}`;
  try {
    const response = await baseInstance.post(baseUrl, {
      ticker,
      message,
      quantity,
      tradingCode,
    });
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const searchStocks = async (corp, page, size) => {
  const baseUrl = `/corp${corp}?page=${page}&size=${size}`;
  try {
    const response = await baseInstance.get(baseUrl);
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const fetchProposal = async (status, year, month) => {
  const baseUrl = `/proposal/invest/history/${status}?year=${year}&month=${month}`;
  try {
    const response = await baseInstance.get(baseUrl);
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
};
