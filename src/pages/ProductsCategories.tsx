import CategoriesPageView from "../features/CategoriesPage/CategoriesPageView";
import styles from "../features/CategoriesPage/styles/CategoriesPage.module.css";
const ProductsCategories = ()=>{
    return(
        <main className={styles['categories-page']}>
            <CategoriesPageView/>
        </main>
    );
};

export default ProductsCategories;