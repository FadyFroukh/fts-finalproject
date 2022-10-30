import { InputLabel,Button } from "@mui/material"
import { Field } from "formik"
import FormPart from "../../../utilities/components/FormPart"
import InputLabelFade from "../../../utilities/components/InputLabelFade"
import styles from '../styles/CategoriesPage.module.css';

const CategoryForm = () => {
  return (
    <>
        <FormPart>
            <InputLabel required htmlFor="categoryId">Category ID</InputLabel>
            <Field name='categoryId'>
                {
                    (props)=>{
                        return <InputLabelFade field={props.field} type='text'/>
                    }
                }
            </Field>
            <FormPart>
                <InputLabel required htmlFor="categoryName">Category Name</InputLabel>
                <Field name='categoryName'>
                    {
                        (props)=>{
                            return <InputLabelFade field={props.field} type='text'/>
                        }
                    }
                </Field>
            </FormPart>
            <FormPart>
                <div className={styles['btn-div']}>
                    <Button variant="contained" type="submit">Submit Category</Button>
                </div>
            </FormPart>
        </FormPart>
    </>
  )
}

export default CategoryForm