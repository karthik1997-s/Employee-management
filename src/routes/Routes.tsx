import { lazy } from "react";
import type { ReactNode } from "react";
import { useRoutes, Navigate } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import UnAuthRoutes from "./UnAuthRoutes";
import AuthRoutes from "./AuthRoutes";
import Loadable from "../components/Loadable";
import MainLayout from "../layout/MainLayout";

const Login = Loadable(lazy(() => import("../pages/login")));
const Employees = Loadable(lazy(() => import("../pages/employee")));
const routes: RouteObject[] = [
  {
    path: "",
    element: <UnAuthRoutes />,
    children: [{ path: "/login", element: <Login /> }],
  },
  {
    path: "/",
    element: <AuthRoutes />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/dashboard" />,
          },
          {
            path: "dashboard",
            element: <Employees />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/login" />,
  },
];

export default function Routes(): ReactNode {
  return useRoutes(routes);
}
