import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "../features/CategoriesPage/categoriesPageSlice";
import loginPageReducer from "../features/LoginPage/loginPageSlice";
import posPageReducer from "../features/PosPage/posPageSlice";

const store = configureStore({
    reducer:{
        loginPage:loginPageReducer,
        posPage:posPageReducer,
        categoriesSlice:categoriesReducer
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch