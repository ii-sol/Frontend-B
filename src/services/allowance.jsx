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
    const response = await baseInstance.get(`/allowances/temporal?csn=${csn}`);

    if (response.data.success) {
      return response.data.response;
    } else {
      return response.data.error.message;
    }
  } catch (error) {
    throw error;
  }
};
