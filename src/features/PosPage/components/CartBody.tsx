import { useAppDispatch } from "../../../hooks/hooks";
import { Cart, filterCartBySearchValue,deleteCart, fetchCarts } from "../posPageSlice";
import styles from "../styles/PosPage.module.css";
import CartTable from "./CartTable";
import ProductsSearch from "./ProductsSearch";
import { values } from "../PosPageView";
import { Button } from "@mui/material";
import { DeleteForever } from "@mui/icons-material";

type CartBodyProps = {
    cart:Cart
};

const CartBody = ({cart}:CartBodyProps) => {

  const dispatch = useAppDispatch();

  const searchFunction = (values:values)=>{
    dispatch(filterCartBySearchValue(values.searchText))
  };

  const handleDeleteCart = (id:number)=>{
    dispatch(deleteCart(id));
    dispatch(fetchCarts());
  };

  return (
    <section className={styles['cart-body']}>
        <header className={styles['cart-body-header']}>
            <Button 
            endIcon={<DeleteForever/>}
            variant='contained'
            color='error'
            onClick={()=> handleDeleteCart(cart.id)}
            >
                Remove
            
            </Button>
        </header>
        <CartTable products={cart.products} cartId={cart.id}/>
    </section>
  )
}

export default CartBody