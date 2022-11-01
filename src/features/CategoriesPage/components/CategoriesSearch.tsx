import { Formik,Form, Field, FieldProps } from "formik";
import InputLabelFade from "../../../utilities/components/InputLabelFade";
import styles from "../styles/CategoriesPage.module.css";
import { useAppDispatch } from "../../../hooks/hooks";
import {FormEvent } from "react";
import { InputLabel } from "@mui/material";
import { searchCategoriesByName } from "../categoriesPageSlice";

type initialValues = {
  searchText:string
};

const initialValues : initialValues = {
  searchText:""
};

const CategoriesSearch = () => {

  const dispatch = useAppDispatch();


  return (
    <Formik
      initialValues={initialValues}
      onSubmit={()=>{}}
    >
      <Form method="POST" className={styles['search-form']} 
        onChange={(e:FormEvent)=>dispatch(searchCategoriesByName((e.target as HTMLInputElement).value))}
      >
          <InputLabel>Search a Category By Name</InputLabel>
          <Field name='searchText'>
            {
              (props:FieldProps)=> {
                return (
                    <InputLabelFade field={props.field} type='text'/>
                )
              }
            }
          </Field>
      </Form>
    </Formik>
  )
}

export default CategoriesSearch