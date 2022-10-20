import { configureStore } from "@reduxjs/toolkit";
import loginPageReducer from "../features/LoginPage/loginPageSlice";

const store = configureStore({
    reducer:{
        loginPage:loginPageReducer
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch