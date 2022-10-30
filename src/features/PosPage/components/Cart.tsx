import AddIcon from '@mui/icons-material/Add';
import { Typography,Button } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import ZeroCount from '../../../utilities/components/ZeroCount';
import { fetchCarts, selectCarts , addNewCart } from "../posPageSlice";
import styles from "../styles/PosPage.module.css";
import CartBody from "./CartBody";
const Cart = () => {

  const carts = useAppSelector(selectCarts);

  const dispatch = useAppDispatch();

  const handleAddCart = ()=>{
    dispatch(addNewCart());
    setTimeout(()=>{
      dispatch(fetchCarts());
    },500);
  }

  useEffect(()=>{
    dispatch(fetchCarts());
  },[]);

  return (
    <aside className={styles['cart']}>
        <header className={styles['cart-header']}>
            <Typography variant="h6">Number of Carts : {carts?.length}</Typography>
            <Button 
            variant="contained" 
            onClick={handleAddCart}
            endIcon={<AddIcon/>}
            >
              Add Cart
            </Button>
        </header>
        {
          carts.length > 0 ?
          carts?.map(cart=>(
            <CartBody key={cart.id} cart={cart}/>
          )) : <ZeroCount message='No Available Carts'/>
        }
    </aside>
  )
}

export default Cart