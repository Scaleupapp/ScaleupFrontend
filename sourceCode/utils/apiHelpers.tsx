import { Store } from "../redux";
import { apiClient } from "./api";
import { BASE_URL, POST_METHOD, REGISTER, SIGNIN, } from "./apiConstant";

export const registerApi = (payload) => {
    console.log("login_payload--->", payload)
    return apiClient({
      baseURL: BASE_URL,
      method: POST_METHOD,
      url: REGISTER,
      data: payload,
    });
  };


  export const loginApi = (payload) => {
    console.log("login_payload--->", payload)
    return apiClient({
      baseURL: BASE_URL,
      method: POST_METHOD,
      url: SIGNIN,
      data: payload,
    });
  };


 