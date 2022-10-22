import { configureStore } from "@reduxjs/toolkit";
import loginPageReducer from "../features/LoginPage/loginPageSlice";
import posPageReducer from "../features/PosPage/posPageSlice";

const store = configureStore({
    reducer:{
        loginPage:loginPageReducer,
        posPage:posPageReducer
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch