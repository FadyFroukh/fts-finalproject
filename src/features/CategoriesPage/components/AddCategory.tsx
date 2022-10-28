import { Form, Formik } from "formik"
import CategoryForm from "./CategoryForm";

import styles from '../styles/CategoriesPage.module.css';
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { addCategory, fetchCategories, selectCategoriesSlice } from "../categoriesPageSlice";
import LoadingGIF from "../../../utilities/components/LoadingGIF";
import AlertCard from "../../../utilities/components/AlertCard";

export type FormCategory = {
    categoryId:string,
    categoryName:string
};

const initialValues : FormCategory = {
    categoryId:'',
    categoryName:''
};

const AddCategory = () => {
    
    const categoriesSlice = useAppSelector(selectCategoriesSlice);

    const dispatch = useAppDispatch();

  return (
    <Formik 
        initialValues={initialValues}
        onSubmit={(values)=>{
            const {categoryId,categoryName} = values;
            dispatch(addCategory({categoryId,categoryName}));
            setTimeout(()=>{
                dispatch(fetchCategories());
            },100);
        }}
    >
        <Form className={styles['add-category-form']}>
            {
                categoriesSlice.addCategoryLoading && <LoadingGIF/>
            }
            {
                !categoriesSlice.addCategoryLoading && categoriesSlice.addCategoryError ? 
                <AlertCard severity="error" title="Error!" msg={categoriesSlice.addCategoryError}/> : null
            }
            {
                !categoriesSlice.addCategoryLoading && categoriesSlice.addCategorySuccess ? 
                <AlertCard severity="success" title="Success!" msg={'Category Added Successfully'}/> : null
            }
            <CategoryForm/>
        </Form>
    </Formik>
  )
}

export default AddCategory