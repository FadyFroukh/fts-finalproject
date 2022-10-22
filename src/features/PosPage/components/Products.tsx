import { useEffect} from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import ZeroCount from "../../../utilities/components/ZeroCount";
import { fetchProducts, selectAllProducts } from "../posPageSlice";
import styles from "../styles/PosPage.module.css";
import PageProduct from "./PageProduct";

const Products = () => {
  const dispatch = useAppDispatch();

  const products = useAppSelector(selectAllProducts);

  useEffect(()=>{
    dispatch(fetchProducts());
  },[]);

  return (
    <div className={styles['products']}>
        {
          products.length > 0 ? 
          products.map(product=>(
            <PageProduct 
            product={product}
            key={product.productCode}/>
          )) : <ZeroCount message="No Current Products"/>
        }
    </div>
  )
}

export default Products