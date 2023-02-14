import axios, { AxiosRequestConfig } from "axios";
import { Config } from "../utils/config";
import { AuthActions, useAuth } from "../zustand/auth.store";

export const createApiClient = (auth = true) => {
  const config: AxiosRequestConfig = {
    baseURL: Config.apiUrl,
  };
  if (auth) {
    const token: any = useAuth.getState().token;
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
  
  }
  const client = axios.create(config);
  client.interceptors.response.use(
    (res) => {
      return Promise.resolve(res);
    },
    (err) => {
      if (err.response) {
        if (
          err.response.data &&
          err.response.data.message === "Token Expired"
        ) {
          AuthActions.logout();
          window.location.href = "/login";
        }
      }
      return Promise.reject(err);
    }
  );
  return client;
};
