import LoginPageView from "../features/LoginPage/LoginPageView";
import FormImage from "../utilities/components/FormImage";
import styles from "./styles/LoginPage.module.css";
const LoginPage = ()=>{
    return(
        <main className={styles['login-page']}>
            <FormImage imgSrc="login-avatar.png"/>
            <LoginPageView/>
        </main>
    );
};

export default LoginPage;