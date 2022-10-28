import { Formik,Form, Field,useFormikContext } from "formik";
import InputLabelFade from "../../../utilities/components/InputLabelFade";
import styles from "../styles/CategoriesPage.module.css";
import { useAppDispatch } from "../../../hooks/hooks";
import {useEffect } from "react";
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
  
  const FormObserver: React.FC = () => {
    const {values} = useFormikContext();

    useEffect(() => {
        dispatch(searchCategoriesByName(values?.searchText));
    }, [values]);

    return null;
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={()=>{}}
    >
      <Form method="POST" className={styles['search-form']}>
        <FormObserver/>
          <InputLabel>Search a Category By Name</InputLabel>
          <Field name='searchText'>
            {
              (props)=> {
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