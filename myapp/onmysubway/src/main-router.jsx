import React from "react";
import { createBrowserRouter } from "react-router-dom";
import LandingPage from "~/routes/landing/page";
import MainPage from "./routes/main/page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    index: true,
  },
  {
    path: "/main",
    element: <MainPage />,
    index: true,
  },
]);
export default router;
