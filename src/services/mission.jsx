import { baseInstance } from "./api";

export const fetchMissionDetail = async (id) => {
  try {
    const response = await baseInstance.get(`/missions/${id}`);

    return response.data.response;
  } catch (error) {
    throw error;
  }
};

export const fetchMissions = async (sn, status) => {
  try {
    const response = await baseInstance.get(`/missions/${sn}/filter?statue=${status}`);

    return response.data.response;
  } catch (error) {
    throw error;
  }
};

export const fetchPendingMissions = async (sn) => {
  try {
    const response = await baseInstance.get(`/missions/${sn}/pending`);

    return response.data.response;
  } catch (error) {
    throw error;
  }
};

export const fetchOngoingMissions = async (sn) => {
  try {
    const response = await baseInstance.get(`/missions/${sn}/ongoing`);

    return response.data.response;
  } catch (error) {
    throw error;
  }
};

export const fetchMissionHistory = async (sn, year, month, status) => {
  try {
    let response;
    if (status === 0) {
      response = await baseInstance.get(`/missions/${sn}/history?year=${year}&month=${month}`);
    } else if (status === 1) {
      response = await baseInstance.get(`/missions/${sn}/history?year=${year}&month=${month}&status=4`);
    } else if (status === 2) {
      response = await baseInstance.get(`/missions/${sn}/history?year=${year}&month=${month}&status=5`);
    }

    return response.data.response;
  } catch (error) {
    throw error;
  }
};

export const createMissionRequest = async (data) => {
  try {
    const response = await baseInstance.post(`/missions`, data);

    return response.data.response;
  } catch (error) {
    throw error;
  }
};

export const acceptMissionRequest = async (data) => {
  try {
    const response = await baseInstance.put(`/missions`, data);

    return response.data.response;
  } catch (error) {
    throw error;
  }
};
