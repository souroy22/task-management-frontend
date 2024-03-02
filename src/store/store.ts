import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userReducer";
import globalReducer from "./global/globalReducer";
import taskReducer from "./task/taskReducer";

const store = configureStore({
  reducer: { userReducer, globalReducer, taskReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
