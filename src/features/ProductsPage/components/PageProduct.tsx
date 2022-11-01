import {Card,CardActions,CardContent,CardMedia,Typography } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Actions from "../../../utilities/components/Actions";
import Action from "../../../utilities/components/Action";
import {fetchProduct, Product, selectCarts} from "../../PosPage/posPageSlice";
import { useContext } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { Box } from "@mui/system";
import { ProductsPageContext } from "../ProductsPageView";

type productProps = {
  product:Product
}

const PageProduct = ({product}:productProps) => {

  const carts = useAppSelector(selectCarts);

  const dispatch = useAppDispatch();

  const {setDeleteOpen,setEditOpen,setProductId,setProduct} = useContext(ProductsPageContext);

  const handleDelete = ()=>{
    setDeleteOpen(true);
    setProductId(product.id);
  };

  const handleEdit = ()=>{
    setEditOpen(true);
    dispatch(fetchProduct(product))
  };

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