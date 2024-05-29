import React from "react";
import { RouterProvider } from "react-router-dom";
import mainRouter from "./main-router";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store, { persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={mainRouter} />
      </PersistGate>
    </Provider>
  );
}
export default App;
