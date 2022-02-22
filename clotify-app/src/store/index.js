import { configureStore } from "@reduxjs/toolkit";

import user from "./user";
import home from "./home";
import admin from "./admin";

const store = configureStore({
  reducer: { user: user.reducer, home: home.reducer, admin: admin.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
