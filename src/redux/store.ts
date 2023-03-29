import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import searchReducer from "./searchSlice";
import { questionApi } from "./questionApi";
import { tagApi } from "./tagApi";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    [questionApi.reducerPath]: questionApi.reducer,
    [tagApi.reducerPath]: tagApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(questionApi.middleware, tagApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
