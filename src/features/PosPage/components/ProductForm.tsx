import CustomSelect from "../../../utilities/components/CustomSelect";
import FormPart from "../../../utilities/components/FormPart";
import InputLabelFade from "../../../utilities/components/InputLabelFade";
import { Button, InputLabel } from "@mui/material";
import { Field, FieldProps } from "formik";
import styles from '../styles/PosPage.module.css';

const ProductForm = () => {
  return (
    <>
        <FormPart>
            <InputLabel htmlFor="productCode">Product Code</InputLabel>
            <Field name='productCode'>
                {
                    (props:FieldProps)=>{
                        return <InputLabelFade field={props.field} type='text'/>
                    }
                }
            </Field>
        </FormPart>
        <FormPart>
            <InputLabel htmlFor="productName">Product Name</InputLabel>
            <Field name='productName'>
                {
                    (props:FieldProps)=>{
                        return <InputLabelFade field={props.field} type='text'/>
                    }
                }
            </Field>
        </FormPart>
        <FormPart>
            <InputLabel htmlFor="productCategory">Product Category</InputLabel>
            <Field name='productCategory'>
                {
                    (props:FieldProps)=>{
                        return <CustomSelect field={props.field}/>
                    }
                }
            </Field>
        </FormPart>
        <FormPart>
            <InputLabel htmlFor="productImage">Product Image</InputLabel>
            <Field name='productImage'>
                {
                    (props:FieldProps)=>{
                        return <InputLabelFade field={props.field} type='text'/>
                    }
                }
            </Field>
        </FormPart>
        <FormPart>
            <InputLabel htmlFor="productPrice">Product Price</InputLabel>
            <Field name='productPrice'>
                {
                    (props:FieldProps)=>{
                        return <InputLabelFade field={props.field} type='number'/>
                    }
                }
            </Field>
        </FormPart>
        <FormPart>
            <div className={styles['btn-div']}>
                <Button variant="contained" type="submit">Submit Product</Button>
            </div>
        </FormPart>
    </>
  )
}

export default ProductForm;