import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import UserSlice from "./UserSlice";

const parsisConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  AllUser: UserSlice,
});
const parsisReducer = persistReducer(parsisConfig, rootReducer);

const store = configureStore({
  reducer: parsisReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
