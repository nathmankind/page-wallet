import { AxiosBasicCredentials } from "axios";
import { create } from "zustand";
import { combine, persist } from "zustand/middleware";

type ROLE = "IBILE ADMIN" | "IBILE AMBASSADOR" | "IBILE AGENT"

interface Auth {
    username:string;
    password:string;
}

export const useAuth = create(
  persist(
    combine(
      {
        loggedIn: false,
        token: null as string | null | AxiosBasicCredentials,
        userId: null as string | null,
        profile: null,
        role: null as ROLE | null | string,
      },
      (set) => ({
        setLoggedIn: (value: boolean) => {
          set({ loggedIn: value });
        },
        setToken: (token: string | AxiosBasicCredentials) => {
          set({ token });
        },
        setUserProfile: (profile: any) => {
          set({ profile, loggedIn: true });
        },
        setUserRoleType: (role: string) => {
          set({ role });
        },
        logout: () => {
          set({
            loggedIn: false,
            token: null,
            userId: "",
            profile: null,
            role: null,
          });
        },
      })
    ),
    {
      name: "page-wallet-auth",
      getStorage: () => sessionStorage,
    }
  )
);

export const AuthActions = {
  logout: () => {
    useAuth.getState().logout();
  },
  setToken: (token: string | AxiosBasicCredentials) => {
    useAuth.getState().setToken(token);
  },
  setUserId: (userId: string) => {
    useAuth.setState({ userId });
  },
  setProfile: (profile: any) => {
    useAuth.getState().setUserProfile(profile);
  },
  setRole: (role: string) => {
    useAuth.setState({ role });
  },
};
