import PosPageView from "../features/PosPage/PosPageView";
import styles from "../features/PosPage/styles/PosPage.module.css";
const POSPage = ()=>{
    return(
        <main className={styles['pos-page']}>
            <PosPageView/>
        </main>
    );
};

export default POSPage;