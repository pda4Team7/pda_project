import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainPage from "~/routes/main/page";
import LandingPage from "~/routes/landing/page";
import LoginPage from "~/routes/login/page";
import SignUpPage from "~/routes/signup/page";
import InfoPage from "~/routes/info/page";

import CompletePage from "~/routes/seatInfo/completePage";
import SeatInfoPage from "~/routes/seatInfo/page";

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

  // 수정 부탁드립니다 ㅜㅜ
  {
    path: "/seatInfo",
    element: <SeatInfoPage />,

    children: [
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
]);
export default router;
