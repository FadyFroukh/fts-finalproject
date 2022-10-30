import { Button, InputLabel } from "@mui/material";
import { Field, Form, Formik } from "formik"
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import AlertCard from "../../../utilities/components/AlertCard";
import CustomSelect from "../../../utilities/components/CustomSelect";
import FormPart from "../../../utilities/components/FormPart";
import InputLabelFade from "../../../utilities/components/InputLabelFade";
import LoadingGIF from "../../../utilities/components/LoadingGIF";
import { editProduct, fetchProducts, selectPosPage, selectProduct ,setProductAddLoading } from "../posPageSlice";
import styles from '../styles/PosPage.module.css';
import ProductForm from "./ProductForm";

const EditProductForm = () => {

    const product = useAppSelector(selectProduct);
    const posPage = useAppSelector(selectPosPage);

    const dispatch = useAppDispatch();

  return (
    <Formik
        initialValues={product}
        onSubmit={(values)=>{
        dispatch(setProductAddLoading());
        setTimeout(()=>{
            dispatch(editProduct(values));
            setTimeout(()=>{
                dispatch(fetchProducts());
            },500)
        },3000);
        }}
    >
       <Form className={styles['edit-product-form']}>
            {
                posPage.productLoading && <LoadingGIF/>
            }
            {
                !posPage.productLoading && posPage.editProductError ? <AlertCard severity="error" title="Error!" msg={posPage.editProductError}/> : null
            }
            {
                !posPage.productLoading && posPage.editProductSuccess ?  <AlertCard severity="success" title="Product Edited!" msg={"Product Edited Successfully"}/> : null
            }
            <ProductForm/>
       </Form>
    </Formik>
  )
}

export default EditProductForm