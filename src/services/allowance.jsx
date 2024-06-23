import { baseInstance } from "./api";

export const fetchRegularAllowance = async (csn) => {
  try {
    const response = await baseInstance.get(`/allowances/monthly?csn=${csn}`);

    if (response.data.success) {
      return response.data.response;
    } else {
      return response.data.error.message;
    }
  } catch (error) {
    throw error;
  }
};

export const fetchAllowanceRequest = async (csn) => {
  try {
    const response = await baseInstance.get(`/allowance/history/temporal/${csn}`);

    if (response.data.success) {
      return response.data.response;
    } else {
      return response.data.error.message;
    }
  } catch (error) {
    throw error;
  }
};

export const createDecision = async (id, accept) => {
  try {
    const response = await baseInstance.post(`/allowances/temporal?temporalAllowanceId=${id}&accept=${accept}`);

    if (response.data.success) {
      return response.data.response;
    } else {
      return response.data.error.message;
    }
  } catch (error) {
    throw error;
  }
};

export const fetchAllowanceHistory = async (year, month, csn) => {
  try {
    const response = await baseInstance.get(`/allowances/history?year=${year}&month=${month}?csn=${csn}`);

    if (response.data.success) {
      return response.data.response;
    } else {
      return response.data.error.message;
    }
  } catch (error) {
    throw error;
  }
};
