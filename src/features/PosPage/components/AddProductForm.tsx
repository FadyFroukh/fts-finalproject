import { Button, InputLabel } from "@mui/material";
import { Field, Form, Formik } from "formik"
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import AlertCard from "../../../utilities/components/AlertCard";
import CustomSelect from "../../../utilities/components/CustomSelect";
import FormPart from "../../../utilities/components/FormPart";
import InputLabelFade from "../../../utilities/components/InputLabelFade";
import LoadingGIF from "../../../utilities/components/LoadingGIF";
import { addProduct, fetchProducts, selectPosPage, setProductAddLoading } from "../posPageSlice";
import styles from '../styles/PosPage.module.css';

export type addProductValues = {
    productCode:string,
    productName:string,
    productCategory:string,
    productImage:string
};

const addProductValues : addProductValues = {
    productCode:"",
    productName:"",
    productCategory:"",
    productImage:""
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
                    productCategory:values.productCategory,productImage:values.productImage
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
            <FormPart>
                <InputLabel htmlFor="productCode">Product Code</InputLabel>
                <Field name='productCode'>
                    {
                        (props)=>{
                            return <InputLabelFade field={props.field} type='text'/>
                        }
                    }
                </Field>
            </FormPart>
            <FormPart>
                <InputLabel htmlFor="productName">Product Name</InputLabel>
                <Field name='productName'>
                    {
                        (props)=>{
                            return <InputLabelFade field={props.field} type='text'/>
                        }
                    }
                </Field>
            </FormPart>
            <FormPart>
                <InputLabel htmlFor="productCategory">Product Category</InputLabel>
                <Field name='productCategory'>
                    {
                        (props)=>{
                            return <CustomSelect field={props.field}/>
                        }
                    }
                </Field>
            </FormPart>
            <FormPart>
                <InputLabel htmlFor="productImage">Product Image</InputLabel>
                <Field name='productImage'>
                    {
                        (props)=>{
                            return <InputLabelFade field={props.field} type='text'/>
                        }
                    }
                </Field>
            </FormPart>
            <FormPart>
                <div className={styles['btn-div']}>
                    <Button variant="contained" type="submit">Add Product</Button>
                </div>
            </FormPart>
        </Form>
    </Formik>
  )
}

export default AddProductForm