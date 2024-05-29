import { combineReducers } from "redux";
import UserReducer from "./reducers/user";
import { configureStore } from "@reduxjs/toolkit";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: UserReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({ reducer: rootReducer });
// const store = configureStore({ reducer: persistedReducer });

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});
const persistor = persistStore(store);

export default store;
export { persistor, store };
