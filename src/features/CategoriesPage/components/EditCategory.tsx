import { Form, Formik } from "formik"
import { useContext } from "react"
import { CategoriesContext } from "../CategoriesPageView"
import CategoryForm from "./CategoryForm"
import styles from '../styles/CategoriesPage.module.css';
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { editCategory, fetchCategories, selectCategoriesSlice } from "../categoriesPageSlice";
import LoadingGIF from "../../../utilities/components/LoadingGIF";
import AlertCard from "../../../utilities/components/AlertCard";

const EditCategory = () => {
    const dispatch = useAppDispatch();
    const {category} = useContext(CategoriesContext);

    const categoriesSlice = useAppSelector(selectCategoriesSlice);

  return (
    <Formik
        initialValues={category}
        onSubmit={(values)=>{
            const {id,categoryId,categoryName} = values;
            dispatch(editCategory({id,categoryId,categoryName}));
            setTimeout(()=>{
                dispatch(fetchCategories());
            },100)
        }}
    >
        <Form className={styles['edit-category-form']}>
            {
                categoriesSlice.editCategoryLoading && <LoadingGIF/>
            }
            {
                !categoriesSlice.editCategoryLoading && categoriesSlice.editCategoryError ? 
                <AlertCard severity="error" title="Error!" msg={categoriesSlice.editCategoryError}/> : null
            }
            {
                !categoriesSlice.editCategoryLoading && categoriesSlice.editCategorySuccess ? 
                <AlertCard severity="success" title="Success!" msg={'Category Edited Successfully!'}/> : null
            }
            <CategoryForm/>
        </Form>
    </Formik>
  )
}

export default EditCategory