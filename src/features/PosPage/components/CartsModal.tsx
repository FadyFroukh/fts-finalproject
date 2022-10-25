import { useAppSelector } from "../../../hooks/hooks"
import { selectCarts } from "../posPageSlice";
import CartButton from "./CartButton";

const CartsModal = () => {

    const carts = useAppSelector(selectCarts);

  return (
    <div style={{marginTop:'1rem'}}>
        {
            carts.map((cart,index)=>(
                <CartButton key={cart.id} cart={cart}/>
            ))
        }
    </div>
  )
}

export default CartsModal