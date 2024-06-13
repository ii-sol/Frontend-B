import axios from "axios";

export const BASE_URL = "http://127.0.0.1:3000/api";

export const baseInstance = axios.create({
  baseURL: BASE_URL,
});
