import { Formik,Form, Field, FormikProps, useFormikContext } from "formik";
import InputLabelFade from "../../../utilities/components/InputLabelFade";
import styles from "../styles/PosPage.module.css";
import { useAppDispatch } from "../../../hooks/hooks";
import { filterBySearchValue } from "../posPageSlice";
import { FormEvent, useEffect } from "react";

type initialValues = {
  searchText:string
};

const initialValues : initialValues = {
  searchText:""
};

const ProductsSearch = () => {

  const dispatch = useAppDispatch();
  
  const FormObserver: React.FC = () => {
    const {values} = useFormikContext();

    useEffect(() => {
      dispatch(filterBySearchValue(values?.searchText));
    }, [values]);

    return null;
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values)=>{
        dispatch(filterBySearchValue(values.searchText));
      }}
    >
      <Form method="POST" className={styles['search-form']}>
        <FormObserver/>
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

export default ProductsSearch