import axios from "axios";
import { getCookie, setCookie, removeCookie } from "./cookie";
import { store } from "../store/stores";
import { loginSuccess, logout } from "../store/reducers/Auth/user";

export const BASE_URL = "http://127.0.0.1:8081";

export const baseInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

baseInstance.interceptors.request.use(
  (config) => {
    const accessToken = getCookie("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

baseInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(error);
    const statusCode = error.response?.status;
    if (statusCode == 401) {
      try {
        const refreshToken = getCookie("refreshToken");
        if (!refreshToken) {
          removeCookie("accessToken");
          store.dispatch(logout());
          return Promise.reject(error);
        }
        const refreshResponse = await axios.post(
          `${BASE_URL}/auth/token`,
          null,
          {
            headers: {
              "Refresh-Token": `${refreshToken}`,
            },
          }
        );
        console.log("refreshResponse", refreshResponse);
        const newAccessToken = refreshResponse.headers.authorization;
        setCookie("accessToken", newAccessToken, {
          path: "/",
        });

        store.dispatch(
          loginSuccess({
            userInfo: store.getState().user.userInfo,
            accessToken: newAccessToken,
            refreshToken: refreshToken,
          })
        );

        error.config.headers.Authorization = newAccessToken;

        return axios(error.config);
      } catch (err) {
        removeCookie("accessToken");
        removeCookie("refreshToken");
        store.dispatch(logout());
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);
