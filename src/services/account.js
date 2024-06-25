import { baseInstance } from "./api";

export const fetchMyAccount = async () => {
  const baseUrl = `/account/3`;
  try {
    const response = await baseInstance.get(baseUrl);
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const fetchInvestAccount = async (csn) => {
  const baseUrl = `/account/find/${csn}`;
  try {
    const response = await baseInstance.get(baseUrl);
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const fetchHistory = async (year, month, status) => {
  try {
    const response = await baseInstance.get(
      `/account/history?year=${year}&month=${month}&status=${status}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchChildHistory = async (csn, year, month, status) => {
  try {
    const response = await baseInstance.get(
      `/account/find/history?csn=${csn}&year=${year}&month=${month}&status=${status}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
