import { Navigate } from "react-router-dom";
import { AuthLayout } from "../pages/auth/layout/AuthLayout";
import { Login } from "../pages/auth/Login";
import { ResetPassword } from "../pages/auth/ResetPassword";
import { IModuleRouter } from "./index";
import { Register } from "../pages/auth/Register";
import { CreatePIN } from "../pages/auth/CreatePin";

export const AuthRouter: IModuleRouter = {
  key: "auth",
  guard: (loggedIn) => !loggedIn,
  // @ts-ignore
  layout: AuthLayout,
  routes: [
    // {
    //   index: true,
    //   element: <Navigate to="/login" />,
    // },
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register/> ,
    },
    {
      path: "/create-pin",
      element: <CreatePIN />,
    },
    {
      path: "/reset-password",
      element: <ResetPassword />,
    },
    {
      path: "*",
      element: <Navigate to="/login" />,
    },
  ],
};
