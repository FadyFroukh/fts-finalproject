import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
import FormModal from "../../utilities/components/FormModal";
import { Category } from "../PosPage/posPageSlice";
import AddCategory from "./components/AddCategory";
import Categories from "./components/Categories";
import CategoriesHeader from "./components/CategoriesHeader";
import CategoriesSearch from "./components/CategoriesSearch";
import DeleteCategory from "./components/DeleteCategory";
import EditCategory from "./components/EditCategory";
import styles from "./styles/CategoriesPage.module.css";

export type CategoriesContext = {
    setAddOpen: Dispatch<SetStateAction<boolean>>,
    setDeleteOpen:Dispatch<SetStateAction<boolean>>,
    setEditOpen:Dispatch<SetStateAction<boolean>>,
    setCategoryId:Dispatch<SetStateAction<number>>,
    setCategory:Dispatch<SetStateAction<Category>>,
    category:Category,
    categoryId:number,
};

export const CategoriesContext = createContext<CategoriesContext>({
    setAddOpen:()=>{},
    setDeleteOpen:()=>{},
    setEditOpen:()=>{},
    setCategoryId:()=>{},
    setCategory:()=>{},
    category:{
        id:0,
        categoryId:'',
        categoryName:''
    },
    categoryId:0

});

const CategoriesPageView = () => {

    const [addOpen,setAddOpen] = useState(false);
    const [editOpen,setEditOpen] = useState(false);
    const [deleteOpen,setDeleteOpen] = useState(false);

    const [categoryId,setCategoryId] = useState(0);
    const [category,setCategory] = useState({  
        id:0,
        categoryId:'',
        categoryName:''
    });

  return (
    <CategoriesContext.Provider value={{setAddOpen,setEditOpen,setDeleteOpen,setCategory,setCategoryId,categoryId,category}}>
        {
            addOpen && 
            <FormModal open={addOpen} setOpen={setAddOpen} message="Add a Category Modal">
               <AddCategory/>
            </FormModal>
        }
        {
            deleteOpen && 
            <FormModal open={deleteOpen} setOpen={setDeleteOpen} message="Delete a Category Modal">
                <DeleteCategory/>
            </FormModal>
        }
        {
            editOpen && 
            <FormModal open={editOpen} setOpen={setEditOpen} message="Edit a Category Modal">
                <EditCategory/>
            </FormModal>
        }
        <section className={styles['categories-main']}>
            <CategoriesHeader/>
            <CategoriesSearch/>
            <Categories/>
        </section>
    </CategoriesContext.Provider>
  )
}

export default CategoriesPageView