import { Formik,Form, Field, FieldProps } from "formik";
import InputLabelFade from "../../../utilities/components/InputLabelFade";
import styles from "../styles/PosPage.module.css";
import { useAppDispatch } from "../../../hooks/hooks";
import { filterBySearchValue } from "../posPageSlice";
import {FormEvent } from "react";
import { InputLabel } from "@mui/material";

type initialValues = {
  searchText:string
};

const initialValues : initialValues = {
  searchText:""
};

const ProductsSearch = () => {

  const dispatch = useAppDispatch();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values)=>{}}
    >
      <Form method="POST" className={styles['search-form']} 
      onChange={(e:FormEvent)=>dispatch(filterBySearchValue((e.target as HTMLInputElement).value))}>
          <InputLabel>Search a Product By Name</InputLabel>
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

export default ProductsSearch