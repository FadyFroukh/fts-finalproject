import { useAppDispatch } from "../../../hooks/hooks";
import { Cart,deleteCart, fetchCarts, patchCart } from "../posPageSlice";
import styles from "../styles/PosPage.module.css";
import CartTable from "./CartTable";
import { Button } from "@mui/material";
import { DeleteForever } from "@mui/icons-material";
import { useEffect,useState } from "react";
import FormModal from "../../../utilities/components/FormModal";
import PaymentDone from "./PaymentDone";

type CartBodyProps = {
    cart:Cart
};

const CartBody = ({cart}:CartBodyProps) => {

  const dispatch = useAppDispatch();
  
  const handleDeleteCart = (id:number)=>{
    dispatch(deleteCart(id));
    dispatch(fetchCarts());
  };

  const [cancelOpen,setCancelOpen] = useState(false);
  const [payOpen,setPayOpen] = useState(false);

  const [total,setTotal] = useState(0);

  const emptyCart = (cartId:number)=>{
    dispatch(patchCart({cartId,updatedProducts:[]}));
    setTotal(0);
    setTimeout(()=>{
      dispatch(fetchCarts());
    },100);
    setCancelOpen(false);
  }

  useEffect(()=>{
    setTotal((total)=>0);
    cart.products.forEach(product=>{
      setTotal((total)=>total+(product.productPrice*product.count));
    });
  },[cart]);

  const handleCancel = (cartId:number)=>{
    emptyCart(cartId);
  };

  const handlePayment = (cartId:number)=>{
    setPayOpen(true);
    emptyCart(cartId);
  };

  return (
    <section className={styles['cart-body']}>
        {
          cancelOpen && 
          <FormModal open={cancelOpen} setOpen={setCancelOpen} message='Are You Sure You Want to Cancel?'>
            <div className={styles['delete-product-form']}>
                <Button
                  variant="contained"
                  color='error'
                  onClick={()=>handleCancel(cart.id)}
                >
                  DELETE
                </Button>
                <Button
                  variant="contained"
                  onClick={()=>setCancelOpen(false)}
                >
                  FORGET IT
                </Button>
            </div>
          </FormModal>
        }
        {
          payOpen &&
          <FormModal open={payOpen} setOpen={setPayOpen} message='Payment Proceded!'>
            <PaymentDone/>
          </FormModal>
        }
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
        <CartTable products={cart.products} cartId={cart.id} total={total}/>
        <div className={styles['cart-payment']}>
          <Button 
          variant="contained" 
          color='error'
          onClick={()=>setCancelOpen(true)}
          >
            CANCEL
          </Button>
          <Button 
          variant="contained"
          onClick={()=>handlePayment(cart.id)}
          >
            PAYMENT
          </Button>
        </div>
    </section>
  )
}

export default CartBody