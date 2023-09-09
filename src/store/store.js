import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./slice";

export const store = configureStore({
  reducer: {
    books: booksReducer,
  },
});
