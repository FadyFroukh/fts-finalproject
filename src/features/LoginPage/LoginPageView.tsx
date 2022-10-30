import { Field, Form, Formik} from "formik";
import InputLabelFade from "../../utilities/components/InputLabelFade";
import FormPart from "../../utilities/components/FormPart";
import { Button } from "@mui/material";
import styles from "../../pages/styles/LoginPage.module.css";
import { checkUser,selectLoginUser,User} from "./loginPageSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import LoadingGIF from "../../utilities/components/LoadingGIF";
import AlertCard from "../../utilities/components/AlertCard";
import { useEffect } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";

type initialValues = {
    id:string,
    password:string
};

type FieldProps = {
    field:object,
    form:object,
    meta:object
};

const initialValues : initialValues = {
    id:"",
    password:""
};

const LoginPageView = ()=>{

    //Component State from Store
    const loginPage = useAppSelector(selectLoginUser);

    //Calling useAppDispatch() to get ready to fetch data
    const dispatch = useAppDispatch();

    //Getting user from localstorage
    const [user,setUser] = useLocalStorage("user",{id:"",password:""});

    useEffect(()=>{
        //Checking if user is already in localstorage
        if (user.id.length > 0){
            window.location.href = "/pos";
        }else {
            setUser(loginPage.user);
        }
    },[user,loginPage]);

    return(
        <Formik
           initialValues={initialValues}
           onSubmit={(values:initialValues)=>{
            dispatch(checkUser({id:values.id,password:values.password}));
        }}
        >
            <Form className={styles['login-form']} method='POST'>
                {loginPage.loading && <LoadingGIF/>}
                {!loginPage.loading && loginPage.error ? <AlertCard severity="error" msg={loginPage.error} title='Error!'/>: null}
                {!loginPage.loading && loginPage.user.id.length > 0 ? window.location.href = "/pos": null}
                <FormPart>
                    <label htmlFor="id">User ID</label>
                    <Field name='id'>
                    {
                        (props:FieldProps)=> {
                            return <InputLabelFade field={props.field} type='text'/>
                        }
                    }
                    </Field>
                </FormPart>
                <FormPart>
                    <label htmlFor="password">Password</label>
                    <Field type='password' name='password'>
                    {
                        (props:FieldProps)=> {
                            return <InputLabelFade field={props.field} type="password"/>
                        }
                    }
                    </Field>
                </FormPart>
                <FormPart>
                    <div className={styles['btn-div']}>
                        <Button variant="contained" type='submit' sx={{width:'150px',height:'45px'}}>
                            <b>SignIn</b>
                        </Button>
                    </div>
                </FormPart>
            </Form>
        </Formik>
    );
};

export default LoginPageView;