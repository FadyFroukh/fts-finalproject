import { createSlice , createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
import { addProductValues } from "./components/AddProductForm";

//Backend server link
const link = "http://localhost:4000";

//Slice Types

export type Product = {
    id:number,
    productCode:string,
    productName:string,
    productCategory:string,
    productImage:string,
    productPrice:number,
    count:number
};


export type Category = {
    id:number,
    categoryId:string,
    categoryName:string
};

export type Cart = {
    id:number,
    products:Product[],
}

type updatedCartProps = {
    updatedProducts:Product[],
    cartId:number
}

export type CartSearch = {
    cartId:number,
    searchText:string
}
type initialState = {
    product:Product,
    productsLoading:boolean
    products:Product[],
    productsError:string,
    categoriesLoading:boolean,
    categories:Category[],
    categoriesError:string,
    mappedProducts:Product[],
    productLoading:boolean,
    addProductSuccess:string
    addProductError:string,
    deleteProductError:string,
    deleteProductSuccess:string,
    editProductError:string,
    editProductSuccess:string,
    carts:Cart[],
    cartsLoading:boolean,
    cartsError:string
};

//Initial State

const initialState : initialState = {
    product:{
        id:0,
        productCode:"",
        productName:"",
        productCategory:"",
        productImage:"",
        productPrice:0,
        count:1
    },
    productsLoading:false,
    products:[],
    productsError:"",
    categoriesLoading:false,
    categories:[],
    categoriesError:"",
    mappedProducts:[],
    productLoading:false,
    addProductSuccess:'',
    addProductError:'',
    deleteProductSuccess:'',
    deleteProductError:'',
    editProductError:'',
    editProductSuccess:'',
    carts:[],
    cartsLoading:false,
    cartsError:""
}

//Action Creators

export const selectPosPage = (state:RootState)=> state.posPage;

export const selectAllProducts = (state:RootState) => state.posPage.mappedProducts;

export const selectProduct = (state:RootState)=> state.posPage.product;

export const selectAllCategories = (state:RootState) => state.posPage.categories;

export const selectCarts = (state:RootState)=> state.posPage.carts;

//Async Functions

export const fetchCategories = createAsyncThunk("posPage/fetchCategories",()=>{
    return axios.get(`${link}/categories`).then(res=>res.data);
});

export const fetchProducts = createAsyncThunk("posPage/fetchProducts",()=>{
    return axios.get(`${link}/products`).then(res => res.data);
});

export const addProduct = createAsyncThunk("posPage/addProduct",({productCode,productName,productCategory,productImage,productPrice}:addProductValues)=>{
    return axios.post(`${link}/products`,{
        productCode,
        productName,
        productCategory,
        productImage,
        productPrice,
        count:1
    }).then(res => res.data);
});

export const deleteProduct = createAsyncThunk("posPage/deleteProduct",(id:number)=>{
    return axios.delete(`${link}/products/${id}`).then(res=>res.data);
});

export const editProduct = createAsyncThunk("posPage/editProduct",(product:Product)=>{
    return axios.put(`${link}/products/${product.id}`,{
        productCode:product.productCode,
        productName:product.productName,
        productCategory:product.productCategory,
        productImage:product.productImage,
        productPrice:product.productPrice
    }).then(res=>res.data);
});

export const fetchCarts = createAsyncThunk("posPage/fetchCarts",()=>{
    return axios.get(`${link}/carts`).then(res => res.data);
});

export const addNewCart = createAsyncThunk("posPage/addNewCart",()=>{
    return axios.post(`${link}/carts`,{products:[]}).then(res=>res.data);
});

export const deleteCart = createAsyncThunk("posPage/deleteCart",(id:number)=>{
    return axios.delete(`${link}/carts/${id}`).then(res=>res.data);
});

export const patchCart = createAsyncThunk("posPage/patchCart",({cartId,updatedProducts}:updatedCartProps)=>{
    return axios.patch(`${link}/carts/${cartId}`,{
        products:updatedProducts
    }).then(res=>res.data);
});

const posPageSlice = createSlice({
    name:"posPage",
    initialState,
    reducers:{
        fetchProduct:{
            reducer(state,action:PayloadAction<Product>){
                state.product = action.payload;
            },
            prepare(product){
                return{
                    payload:product
                }
            }
        },
        filterByCategory:{
            reducer(state,action:PayloadAction<string>){
                state.mappedProducts = state.products.filter(product=>product.productCategory === action.payload);
            },
            prepare(categoryName){
                return{
                    payload:categoryName
                }
            }
        },
        filterBySearchValue:{
            reducer(state,action:PayloadAction<string>){
                state.mappedProducts = state.products.filter(product=>product.productName.toLocaleLowerCase().includes(action.payload));
            },
            prepare(searchText){
                return{
                    payload:searchText
                }
            }
        },
        setProductAddLoading:{
            reducer(state,action:PayloadAction<boolean>){
                state.productLoading = action.payload;
            },
            prepare(){
                return{
                    payload:true
                }
            }
        }
    },
    extraReducers:(builder)=>{
        //Fetch Categories Cases
        builder.addCase(fetchCategories.pending,(state)=>{
            state.categoriesLoading = true;
        });
        builder.addCase(fetchCategories.fulfilled,(state,action)=>{
            state.categoriesLoading = false;
            state.categories = action.payload;
            state.categoriesError = "";
        });
        builder.addCase(fetchCategories.rejected,(state,action)=>{
            state.categoriesLoading = false;
            state.categories = [];
            state.categoriesError = action.error.message || "Categories Loading Error";
        });
        //Fetch Products Cases
        builder.addCase(fetchProducts.pending,(state)=>{
            state.productsLoading = true;
        });
        builder.addCase(fetchProducts.fulfilled,(state,action)=>{
          state.productsLoading = false;
          state.products = action.payload;
          state.mappedProducts = action.payload;
          state.productsError = "";
        });
        builder.addCase(fetchProducts.rejected,(state,action)=>{
            state.productsLoading = false;
            state.products = [];
            state.mappedProducts = [];
            state.productsError = action.error.message || "Products Loading Error";
        });
        //Add Product Cases
        builder.addCase(addProduct.pending,(state)=>{
            state.productLoading = true;
        });
        builder.addCase(addProduct.fulfilled,(state,action)=>{
          state.productLoading = false;
          state.addProductSuccess = action.payload;
        });
        builder.addCase(addProduct.rejected,(state,action)=>{
            state.productLoading = false;
            state.addProductSuccess = '';
            state.addProductError = action.error.message || "Product Addition Error";
        });
        //Delete Product Cases
        builder.addCase(deleteProduct.pending,(state)=>{
            state.productLoading = true;
        });
        builder.addCase(deleteProduct.fulfilled,(state,action)=>{
            state.productLoading = false;
            state.deleteProductSuccess = action.payload;  
        });
        builder.addCase(deleteProduct.rejected,(state,action)=>{
            state.productLoading = false;
            state.deleteProductSuccess = '';
            state.deleteProductError = action.error.message || "Product Deletion Error";
        });
        //Edit Product Cases
          builder.addCase(editProduct.pending,(state)=>{
            state.productLoading = true;
        });
        builder.addCase(editProduct.fulfilled,(state,action)=>{
            state.productLoading = false;
            state.editProductSuccess = action.payload;  
        });
        builder.addCase(editProduct.rejected,(state,action)=>{
            state.productLoading = false;
            state.editProductSuccess = '';
            state.editProductError = action.error.message || "Product Edit Error";
        });
        //Get Carts Cases
        builder.addCase(fetchCarts.pending,(state)=>{
            state.cartsLoading = true;
        });
        builder.addCase(fetchCarts.fulfilled,(state,action)=>{
            state.cartsLoading = false;
            state.carts = action.payload;  
            state.cartsError = '';
        });
        builder.addCase(fetchCarts.rejected,(state,action)=>{
            state.cartsLoading = false;
            state.carts = [];
            state.cartsError = action.error.message || "Carts Loading Error";
        });
    }
});

export default posPageSlice.reducer;

export const {filterByCategory,filterBySearchValue,setProductAddLoading,fetchProduct} = posPageSlice.actions;