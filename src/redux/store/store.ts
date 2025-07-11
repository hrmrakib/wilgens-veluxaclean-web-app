import { configureStore } from "@reduxjs/toolkit";
import baseAPI from "../api/baseAPI";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    [baseAPI.reducerPath]: baseAPI.reducer,

    user: userReducer,
    // Product: ProductSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
