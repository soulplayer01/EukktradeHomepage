import { createBrowserRouter } from "react-router";
import { DesignSystemPage } from "./components/DesignSystemPage";
import { Homepage } from "./components/Homepage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Homepage,
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
