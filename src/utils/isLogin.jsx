import { getCookie } from "../services/cookie";

const isLogin = () => !!getCookie("accessToken");
export default isLogin;
