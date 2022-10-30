import { Form, Formik } from "formik"
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import AlertCard from "../../../utilities/components/AlertCard";
import LoadingGIF from "../../../utilities/components/LoadingGIF";
import { addProduct, fetchProducts, selectPosPage, setProductAddLoading } from "../posPageSlice";
import styles from '../styles/PosPage.module.css';
import ProductForm from "./ProductForm";

export type addProductValues = {
    productCode:string,
    productName:string,
    productCategory:string,
    productImage:string,
    productPrice:number
};

const addProductValues : addProductValues = {
    productCode:"",
    productName:"",
    productCategory:"",
    productImage:"",
    productPrice:0
};

const AddProductForm = () => {

    const posPage = useAppSelector(selectPosPage);

    const dispatch = useAppDispatch();

  return (
    <Formik
        initialValues={addProductValues}
        onSubmit={(values)=>{
            dispatch(setProductAddLoading());
            setTimeout(()=>{
                dispatch(addProduct({
                    productCode:values.productCode,productName:values.productName,
                    productCategory:values.productCategory,productImage:values.productImage,
                    productPrice:values.productPrice
                }));
                values.productCode = "";
                values.productName = "";
                values.productImage = "";
                values.productCategory = "";
                setTimeout(()=>{
                    dispatch(fetchProducts());
                },500)
            },3000);
        }}
    >
        <Form className={styles['add-product-form']}>
            {posPage.productLoading && <LoadingGIF/>}
            {!posPage.productLoading && posPage.addProductError ? <AlertCard severity="error" msg={posPage.addProductError} title='Error!'/>: null}
            {!posPage.productLoading && posPage.addProductSuccess ? <AlertCard severity="success" msg={"Product Added Successfully"} title='Product Added!'/> : null}
            <ProductForm/>
        </Form>
    </Formik>
  )
}

export default AddProductForm