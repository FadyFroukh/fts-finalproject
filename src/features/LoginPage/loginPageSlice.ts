import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";

//Initial State Decleration

export type User = {
    id:string,
    password:string
};

type InitialState = {
    loading:boolean,
    user:User,
    error:string
};

const initialState : InitialState = {
    loading:false,
    user:{id:"",password:""},
    error:""
};

//Action Creators
export const selectLoginUser = (state:RootState) => state.loginPage;

//Async Functions
export const checkUser = createAsyncThunk("loginPage/checkUser",({id,password}:User)=>{
    return axios.get(`http://localhost:4000/users/${id}`).then(res=>res.data);
})

//Creating The Slice
const loginPageSlice = createSlice({
    name:"loginPage",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(checkUser.pending,(state)=>{
            state.loading = true;
        });

        builder.addCase(checkUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.user = action.payload;
            state.error = '';
        });

        builder.addCase(checkUser.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message || "An Error Occured";
            state.user = {id:'',password:''};
        });
    }
});

export default loginPageSlice.reducer;
