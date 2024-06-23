import { baseInstance } from "./api";

export const fetchNoti = async () => {
  const baseUrl = `/notifications`;
  try {
    const response = await baseInstance.get(baseUrl);
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const deleteAllNoti = async () => {
  const baseUrl = `/notifications`;
  try {
    const response = await baseInstance.delete(baseUrl);
    return response;
  } catch (err) {
    console.error(err);
  }
};

export const deleteNoti = async (nsn) => {
  const baseUrl = `/notifications/${nsn}`;
  try {
    const response = await baseInstance.delete(baseUrl);
    return response;
  } catch (err) {
    console.error(err);
  }
};
