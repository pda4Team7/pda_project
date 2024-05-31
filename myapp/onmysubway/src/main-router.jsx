import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainPage from "~/routes/main/page";
import LandingPage from "~/routes/landing/page";
import LoginPage from "~/routes/login/page";
import SignUpPage from "~/routes/signup/page";
import InfoPage from "~/routes/info/page";

import CompletePage from "~/routes/seatInfo/completePage";
import SeatInfoPage from "~/routes/seatInfo/page";
import StandingPage from "~/routes/standing/page";
import SeatListPage from "~/routes/standing/list/page";
import Loading from "./components/loading-page/Loading";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/main",
    element: <MainPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/seatInfo",
    children: [
      {
        path: "",
        element: <SeatInfoPage />,
        index: true,
      },
      {
        path: "complete",
        element: <CompletePage />,
      },
    ],
  },
  {
    path: "/info",
    element: <InfoPage />,
  },
  // 디버깅용
  {
    path: "/loading",
    element: <Loading />,
  },

  {
    path: "/standing",
    children: [
      {
        path: "",
        index: true,
        element: <StandingPage />,
      },
      {
        path: "list",
        element: <SeatListPage />,
      },
    ],
  },
]);
export default router;
