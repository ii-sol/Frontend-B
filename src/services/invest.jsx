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

//
export const fetchPortfolio = async (csn) => {
  const baseUrl = `/invest/portfolio?csn=${csn}`;
  try {
    const response = await baseInstance.get(baseUrl);
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
};

//
export const fetchInvestHistory = async (status, csn, year, month) => {
  const baseUrl = `/invest/history/${status}?csn=${csn}&year=${year}&month=${month}`;
  try {
    const response = await baseInstance.get(baseUrl);
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
};

//
export const fetchMyStocks = async (csn) => {
  const baseUrl = `/my-stocks?csn=${csn}`;
  try {
    const response = await baseInstance.get(baseUrl);
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
};

//
export const postMyStocks = async (csn, ticker) => {
  const baseUrl = `my-stocks?csn=${csn}&ticker=${ticker}`;
  try {
    const response = await baseInstance.post(baseUrl);
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
};

//
export const deleteMyStocks = async (csn, ticker) => {
  const baseUrl = `my-stocks?csn=${csn}&ticker=${ticker}`;
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

//
export const searchStocks = async (csn, corp, page, size) => {
  const baseUrl = `/corp${corp}?csn=${csn}&page=${page}&size=${size}`;
  try {
    const response = await baseInstance.get(baseUrl);
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
};

//
export const fetchProposal = async (status, csn, year, month) => {
  const baseUrl = `/proposal/invest/history/${status}?csn=${csn}&year=${year}&month=${month}`;
  try {
    const response = await baseInstance.get(baseUrl);
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
};

//
export const fetchProposalDetail = async (proposeId, pathVariable, csn) => {
  const baseUrl = `/proposal/invest/${proposeId}/${pathVariable}?csn=${csn}`;
  try {
    const response = await baseInstance.get(baseUrl);
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
};

//
export const postProposalYN = async (proposeId, accept, message, csn) => {
  const baseUrl = `/proposal/invest/${proposeId}?csn=${csn}`;
  try {
    const response = await baseInstance.post(baseUrl, {
      accept,
      message,
    });
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
    if (err.response.data.error) {
      return { error: err.response.data.error };
    } else {
      return { error: "An unexpected error occurred" };
    }
  }
};

//
export const fetchLeftProposal = async (csn) => {
  const baseUrl = `/proposal/invest/no-approve?csn=${csn}`;
  try {
    const response = await baseInstance.get(baseUrl);
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
};
