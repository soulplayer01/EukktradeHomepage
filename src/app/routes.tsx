import { createBrowserRouter, Navigate } from "react-router";
import { DesignSystemPage } from "./components/DesignSystemPage";
import { Homepage } from "./components/Homepage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/design-system" replace />,
  },
  {
    path: "/homepage",
    Component: Homepage,
  },
  {
    path: "/design-system",
    Component: DesignSystemPage,
  },
]);
