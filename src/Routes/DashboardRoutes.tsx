import { Navigate } from "react-router-dom";
import { AdminLayout } from "../pages/dashboard/layout/AdminLayout";
import { LazyRoute } from "../utils/helpers";
import { IModuleRouter } from "./index";

export const AdminDashRouter: IModuleRouter = {
  key: "dashboard",
  guard: (loggedIn) => loggedIn,
  layout: AdminLayout,
  routes: [
    {
      index: true,
      element: <Navigate to="/dashboard" />,
    },
    LazyRoute(
      {
        path: "/dashboard",
      },
      () => import("../pages/dashboard/DashboardPage/DashboardPage")
    ),
    LazyRoute(
      {
        path: "/send",
      },
      () => import("../pages/dashboard/Send")
    ),

    LazyRoute(
      {
        path: "/transactions",
      },
      () => import("../pages/dashboard/Transactions")
    ),
    {
      path: "*",
      element: <div>Not found</div>,
    },
  ],
};
