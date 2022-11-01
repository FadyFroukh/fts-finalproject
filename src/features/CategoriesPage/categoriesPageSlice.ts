import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
import { Category, Product } from "../PosPage/posPageSlice";
import { FormCategory } from "./components/AddCategory";

const link = 'http://localhost:4000';

//Initial State
type initialState = {
    categories:Category[],
    mappedCategories:Category[],
    products:Product[],
    productsLoading:boolean,
    productsError:string,
    categoriesLoading:boolean,
    categoriesError:string,
    addCategoryLoading:boolean,
    addCategorySuccess:string,
    addCategoryError:string,
    editCategoryLoading:boolean,
    editCategorySuccess:string,
    editCategoryError:string,
    deleteCategoryLoading:boolean,
    deleteCategorySuccess:string,
    deleteCategoryError:string
};

const initialState : initialState = {
    categories:[],
    mappedCategories:[],
    products:[],
    productsLoading:false,
    productsError:'',
    categoriesLoading:false,
    categoriesError:'',
    addCategoryLoading:false,
    addCategorySuccess:'',
    addCategoryError:'',
    editCategoryLoading:false,
    editCategorySuccess:'',
    editCategoryError:'',
    deleteCategoryLoading:false,
    deleteCategorySuccess:'',
    deleteCategoryError:''
};

//Action Creators
export const selectCategoriesSlice = (state:RootState) => state.categoriesSlice;

export const selectProductsByCategory = (state:RootState)=> state.categoriesSlice.products;

//Async Functions
export const fetchCategories = createAsyncThunk("categoriesSlice/fetchCategories",()=>{
    return axios.get(`${link}/categories`).then(res=>res.data);
});

export const addCategory = createAsyncThunk("categoriesSlice/addCategory",({categoryId,categoryName}:FormCategory)=>{
    return axios.post(`${link}/categories`,{categoryId,categoryName}).then(res=>res.data);
});

export const editCategory = createAsyncThunk("categoriesSlice/editCategory",({id,categoryId,categoryName}:Category)=>{
    return axios.patch(`${link}/categories/${id}`,{categoryId,categoryName}).then(res=>res.data);
});

export const deleteCategory = createAsyncThunk("categoriesSlice/deleteCategory",(categoryId:number)=>{
    return axios.delete(`${link}/categories/${categoryId}`).then(res=>res.data);
});

export const fetchProductsByCategory = createAsyncThunk("categoriesSlice/fetchProductsByCategory",()=>{
    return axios.get(`${link}/products`).then(res => res.data);
});


//Creating the slice

const categoriesSlice = createSlice({
    name:"categoriesSlice",
    initialState,
    reducers:{
        searchCategoriesByName:{
            reducer(state,action:PayloadAction<string>){
                state.mappedCategories = state.categories.filter(category=>category.categoryName.toLocaleLowerCase().includes(action.payload.toLocaleLowerCase())); 
            },
            prepare(searchText:string){
                return{
                    payload:searchText
                }
            }
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchCategories.pending,(state)=>{
            state.categoriesLoading = true;
        });
        builder.addCase(fetchCategories.fulfilled,(state,action)=>{
            state.categoriesLoading = false;
            state.categories = action.payload;
            state.mappedCategories = action.payload;
            state.categoriesError = '';
        });
        builder.addCase(fetchCategories.rejected,(state,action)=>{
            state.categoriesLoading = false;
            state.categories = [];
            state.mappedCategories = [];
            state.categoriesError = action.error.message || 'Categories Loading Error';
        });
        //ADD CATEGORY
        builder.addCase(addCategory.pending,(state)=>{
            state.addCategoryLoading = true;
        });
        builder.addCase(addCategory.fulfilled,(state,action)=>{
            state.addCategoryLoading = false;
            state.addCategorySuccess = action.payload;
            state.categoriesError = '';
        });
        builder.addCase(addCategory.rejected,(state,action)=>{
            state.addCategoryLoading = false;
            state.addCategorySuccess = '';
            state.addCategoryError = action.error.message || 'Adding Category Loading Error';
        });
        //EDIT CATEGORY
        builder.addCase(editCategory.pending,(state)=>{
            state.editCategoryLoading = true;
        });
        builder.addCase(editCategory.fulfilled,(state,action)=>{
            state.editCategoryLoading = false;
            state.editCategorySuccess = action.payload;
            state.editCategoryError = '';
        });
        builder.addCase(editCategory.rejected,(state,action)=>{
            state.editCategoryLoading = false;
            state.editCategorySuccess = '';
            state.editCategoryError = action.error.message || 'Editing Category Loading Error';
        });
        //DELETE CATEGORY
        builder.addCase(deleteCategory.pending,(state)=>{
            state.deleteCategoryLoading = true;
        });
        builder.addCase(deleteCategory.fulfilled,(state,action)=>{
            state.deleteCategoryLoading = false;
            state.deleteCategorySuccess = action.payload;
            state.deleteCategoryError = '';
        });
        builder.addCase(deleteCategory.rejected,(state,action)=>{
            state.deleteCategoryLoading = false;
            state.deleteCategorySuccess = '';
            state.deleteCategoryError = action.error.message || 'Deleting Category Loading Error';
        });
        //FETCH PRODUCTS
        builder.addCase(fetchProductsByCategory.pending,(state)=>{
            state.productsLoading = true;
        });
        builder.addCase(fetchProductsByCategory.fulfilled,(state,action)=>{
            state.productsLoading = false;
            state.products = action.payload;
            state.productsError = '';
        });
        builder.addCase(fetchProductsByCategory.rejected,(state,action)=>{
            state.productsLoading = false;
            state.products = [];
            state.productsError = action.error.message || 'Products Loading Error';
        });
    }
});

export default categoriesSlice.reducer;

export const {searchCategoriesByName} = categoriesSlice.actions;