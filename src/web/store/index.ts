import { configureStore } from "@reduxjs/toolkit";
import appShellReducer from "./appShellSlice";
import windowReducer from "./window";

export * from "./appShellSlice";
export * from "./window";

export const store = configureStore({
  reducer: { appShell: appShellReducer, window: windowReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
