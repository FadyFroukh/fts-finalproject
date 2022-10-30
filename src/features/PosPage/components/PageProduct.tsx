import {Card,CardActions,CardContent,CardMedia,Typography } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Actions from "../../../utilities/components/Actions";
import Action from "../../../utilities/components/Action";
import {patchCart, fetchCarts, fetchProduct, Product, selectCarts} from "../posPageSlice";
import { useContext } from "react";
import { posContext } from "../PosPageView";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { Box } from "@mui/system";

type productProps = {
  product:Product
}

const PageProduct = ({product}:productProps) => {

  const carts = useAppSelector(selectCarts);

  const dispatch = useAppDispatch();

  const {setDeleteOpen,setEditOpen,setCartsOpen,setProductId,setProduct} = useContext(posContext);

  const handleDelete = ()=>{
    setDeleteOpen(true);
    setProductId(product.id);
  };

  const handleEdit = ()=>{
    setEditOpen(true);
    dispatch(fetchProduct(product))
  };

  const handleAddToCart = ()=>{
    setProduct(product);
    if(carts.length > 1){
      setCartsOpen(true);
    }
    else {
      let updatedProducts = [] as Product[];
      if(!carts[0].products.find(prod=>prod.id === product.id)){
          updatedProducts = carts[0].products.map(prod=>prod);
          updatedProducts.push(product);
      }else {
          updatedProducts = carts[0].products.map(prod=>{
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
    dispatch(patchCart({cartId:carts[0].id,updatedProducts}));
    dispatch(fetchCarts());
    setCartsOpen(false);
    }
  }

  return (
    <Card sx={{ minWidth: 250,margin:'10px 2px' }}>
      <CardMedia
        component="img"
        height="140"
        image={`pictures/${product.productImage}`}
        alt={`${product.productName}`}
      />
      <CardContent>
        <Box sx={{display:'flex',justifyContent:'space-between'}}>
          <Typography gutterBottom variant="h5" component="div">
            {product.productName}
          </Typography>
          <Typography>
            <strong>{product.productPrice}$</strong>
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {product.productCategory}
        </Typography>
      </CardContent>
      <CardActions>
        <Actions>
          <Action color='primary' onClick={handleAddToCart}>
            <ShoppingCartIcon/>
          </Action>
          <Action color='error' onClick={handleDelete}>
            <DeleteForeverIcon/>
          </Action>
          <Action color='success' onClick={handleEdit}>
            <EditIcon/>
          </Action>
        </Actions>
      </CardActions>
    </Card>
  )
}

export default PageProduct;