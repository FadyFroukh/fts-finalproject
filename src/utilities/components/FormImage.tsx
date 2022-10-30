import styles from "../../pages/styles/LoginPage.module.css";

type FormImageProps = {
    imgSrc:string
};

const FormImage = ({imgSrc}:FormImageProps)=>{
    return(
        <section className={styles['form-image']}>
            <img src={`pictures/${imgSrc}`} alt='Login Form Image'/>
        </section>
    );
};

export default FormImage;