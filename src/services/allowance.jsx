import { baseInstance } from "./api";

export const fetchRegularAllowance = async (csn) => {
  try {
    const response = await baseInstance.get(`/allowance/monthly?csn=${csn}`);

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
    const response = await baseInstance.post(`/allowance/temporal?tempId=${id}&accept=${accept}`);

    const data = response.data;
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchAllowanceHistory = async (year, month, csn) => {
  try {
    const response = await baseInstance.get(`/allowance/history?year=${year}&month=${month}&csn=${csn}`);

    if (response.data.success) {
      return response.data.response;
    } else {
      return response.data.error.message;
    }
  } catch (error) {
    throw error;
  }
};

export const createRegularAllowance = async (data) => {
  try {
    const response = await baseInstance.post(`/allowance/monthly`, data);

    if (response.data.success) {
      return response.data.response;
    } else {
      return response.data.error.message;
    }
  } catch (error) {
    throw error;
  }
};

export const updateRegularAllowance = async (allowanceId, data) => {
  try {
    const response = await baseInstance.post(`/allowance/regular/${allowanceId}`, data);

    if (response.data.success) {
      return response.data.response;
    } else {
      return response.data.error.message;
    }
  } catch (error) {
    throw error;
  }
};

export const deleteRegularAllowance = async (allowanceId) => {
  try {
    const response = await baseInstance.delete(`/allowance/monthly/${allowanceId}`);

    if (response.data.success) {
      return response.data.response;
    } else {
      return response.data.error.message;
    }
  } catch (error) {
    throw error;
  }
};
