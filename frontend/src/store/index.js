import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthSlice";
import bookSlice from "./BookSlice";
import clientSlice from "./ClientSlice";
import themeSlice from "./ModeSlice";
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    book: bookSlice.reducer,
    client: clientSlice.reducer,
    theme: themeSlice.reducer,
  },
});

export default store;
