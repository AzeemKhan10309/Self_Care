import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Redux/AuthSlice";
import collectInfoReducer from "./CollectInfoSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    collectInfo: collectInfoReducer,

  },
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // 👈 disables warnings
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
