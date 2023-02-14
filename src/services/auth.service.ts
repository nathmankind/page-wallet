import { createApiClient } from "../utils/api";

export const AuthService = {
  register: (payload: any) => createApiClient(false).post("/register", payload),
  login: (payload: any) => createApiClient(false).post("/login", payload),
  setPin: (payload:{pin : string}) => createApiClient(false).put(`/users/set-pin`, payload)
};
