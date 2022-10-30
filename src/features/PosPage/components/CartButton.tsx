import { ShoppingCart } from '@mui/icons-material';
import { Button } from '@mui/material'
import { useContext } from 'react';
import { useAppDispatch } from '../../../hooks/hooks';
import { Cart, fetchCarts, patchCart, Product } from '../posPageSlice'
import { posContext } from '../PosPageView';

type CartButtonProps = {
    cart:Cart,
};

const CartButton = ({cart}:CartButtonProps) => {

    const dispatch = useAppDispatch();

    const {product,setCartsOpen} = useContext(posContext);

    const handleAddToCart = ()=>{
        let updatedProducts = [] as Product[];
        if(!cart.products.find(prod=>prod.id === product.id)){
            updatedProducts = cart.products.map(prod=>prod);
            updatedProducts.push(product);
        }else {
            updatedProducts = cart.products.map(prod=>{
                if (prod.id === product.id){
                    return {
                        id:prod.id,
                        productCode:prod.productCode,
                        productName:prod.productName,
                        productCategory:prod.productCategory,
                        productImage:prod.productImage,
                        productPrice:prod.productPrice,
                        count:prod.count + 1
                    } as Product;
                }

                return prod;
            });
        }
        dispatch(patchCart({cartId:cart.id,updatedProducts}));
        dispatch(fetchCarts());
        setCartsOpen(false);
    }

  return (
    <Button 
    variant='contained'
    sx={{marginRight:'5px'}}
    endIcon={<ShoppingCart/>}
    onClick={()=> handleAddToCart()}
    >
        {cart.id}
    </Button>
  )
}

export default CartButton