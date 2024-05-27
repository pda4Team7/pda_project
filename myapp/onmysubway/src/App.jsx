import React from "react";
import { RouterProvider } from "react-router-dom";
import mainRouter from "./main-router";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return <RouterProvider router={mainRouter} />;
}
export default App;
