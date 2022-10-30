import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { patchCart, fetchCarts, Product } from '../posPageSlice';
import ZeroCount from '../../../utilities/components/ZeroCount';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Tab, Typography } from '@mui/material';
import styles from "../styles/PosPage.module.css";
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch } from '../../../hooks/hooks';
import { useRef, useState } from 'react';

type CartTableProps = {
    products:Product[],
    cartId:number,
    total:number
};

export default function CartTable({products,cartId,total}:CartTableProps) {

    const dispatch = useAppDispatch();

    const orderTaxRef = useRef<HTMLDivElement>(null);

    const discountRef = useRef<HTMLDivElement>(null);

    const [orderTax,setOrderTax] = useState(0);

    const [discount,setDiscount] = useState(0);

    const handleDeleteFromCart = (cartId:number,productId:number)=>{
        const updatedProducts = products.filter(product=>product.id !== productId)
        dispatch(patchCart({cartId,updatedProducts}));
        dispatch(fetchCarts());
    };

    const handleTaxChange = ()=>{
        setOrderTax((orderTax)=>Number(orderTaxRef.current?.textContent))
    }

    const handleDiscountChange = ()=>{
        setDiscount((discount)=>Number(discountRef.current?.textContent))
    }

    const handleIncrement = (productId:number)=>{
        let updatedProducts = [] as Product[];
        
        updatedProducts = products.map(prod=>{
            if (prod.id === productId){
                return {
                    id:prod.id,
                    productCode:prod.productCode,
                    productName:prod.productName,
                    productCategory:prod.productCategory,
                    productImage:prod.productImage,
                    productPrice:prod.productPrice,
                    count:prod.count + 1
                  } as Product
            } 
            return prod;
        });
        dispatch(patchCart({cartId,updatedProducts}));
        setTimeout(()=>{
            dispatch(fetchCarts());
        },100);
    };

    const handleDecrement = (productId:number)=>{
        let updatedProducts = [] as Product[];
        
        updatedProducts = products.map(prod=>{
            if (prod.id === productId){
                if(prod.count !== 1){
                    return {
                        id:prod.id,
                        productCode:prod.productCode,
                        productName:prod.productName,
                        productCategory:prod.productCategory,
                        productImage:prod.productImage,
                        productPrice:prod.productPrice,
                        count:prod.count - 1
                      } as Product
                }
            } 
            return prod;
        });
        dispatch(patchCart({cartId,updatedProducts}));
        setTimeout(()=>{
            dispatch(fetchCarts());
        },100);
    };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: '100%',height:'100%'}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <>
            {
                products.length > 0 ? 
                products.map(product=>(
                    <TableRow key={product.id}>
                        <TableCell sx={{display:'flex'}}>
                            <CloseIcon 
                            sx={{background:'#FF1E1E',borderRadius:'50%',marginRight:'5px',cursor:'pointer',padding:'2px',color:'#fff'}}
                            onClick={()=>handleDeleteFromCart(cartId,product.id)}
                            />
                            <Typography variant='h6'>{product.productName}</Typography>
                        </TableCell>
                        <TableCell align='right'>
                            <Typography variant='h6'>{product.productPrice}</Typography>    
                        </TableCell>
                        <TableCell className={styles['operations']}>
                            <AddIcon className={styles['operation']} onClick={()=> handleIncrement(product.id)}/>
                            <Typography variant='h6' className={styles['price']}>{product.count}</Typography>
                            <RemoveIcon className={styles['operation']} onClick={()=>handleDecrement(product.id)}/>
                        </TableCell>
                        <TableCell align='right'>
                            <Typography variant='h6'>{product?.count * product?.productPrice}$</Typography>
                        </TableCell>
                    </TableRow>
                ))
                 : <TableRow>
                    <TableCell>
                        <ZeroCount message='No Products Yet'/>
                    </TableCell>
                 </TableRow>
            }
                <TableRow>
                    <TableCell>Subtotal</TableCell>
                    <TableCell></TableCell>
                    <TableCell>{total} USD</TableCell>
                    <TableCell>{products.length} Items</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Order Tax</TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                        <div 
                        contentEditable 
                        suppressContentEditableWarning 
                        ref={orderTaxRef}
                        onKeyUp={handleTaxChange}
                        >
                            0
                        </div>
                    </TableCell>
                    <TableCell>
                        {((orderTax/100) * total).toFixed(2)} USD
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Discount</TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                        <div
                            contentEditable
                            suppressContentEditableWarning
                            ref={discountRef}
                            onKeyUp={handleDiscountChange}
                        >
                            0
                        </div>
                    </TableCell>
                    <TableCell>
                        {((discount/100) * total).toFixed(2)}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Total</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                        {(total + ((orderTax / 100) * total ) - ((discount / 100) * total)).toFixed(2)} USD
                    </TableCell>
                </TableRow>
            </>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
