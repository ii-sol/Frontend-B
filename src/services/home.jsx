import { baseInstance } from "./api";

export const fetchChildInfo = async (sn) => {
  const baseUrl = `/users/child-manage/${sn}`;
  try {
    const response = await baseInstance.get(baseUrl);
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
};
