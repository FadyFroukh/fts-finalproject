import React from "react";
import styles from "../../pages/styles/LoginPage.module.css";

type formPartProps = {
    children:React.ReactNode
}

const FormPart = ({children}:formPartProps)=>{
    return(
        <section className={styles['form-section']}>
            <div className={styles['form-div']}>
                {children}
            </div>
        </section>
    );
};

export default FormPart;