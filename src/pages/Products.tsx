import ProductsPageView from "../features/ProductsPage/ProductsPageView";
import styles from "../features/ProductsPage/styles/ProductsPage.module.css"
const Products = ()=>{
    return(
        <main className={styles['products-page']}>
            <ProductsPageView/>
        </main>
    );
};

export default Products;