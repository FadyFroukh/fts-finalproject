import {Card,CardActions,CardContent,CardMedia,Typography } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Actions from "../../../utilities/components/Actions";
import Action from "../../../utilities/components/Action";
import {fetchProduct, Product} from "../posPageSlice";
import { useContext } from "react";
import { posContext } from "../PosPageView";
import { useAppDispatch } from "../../../hooks/hooks";

type productProps = {
  product:Product
}

const PageProduct = ({product}:productProps) => {

  const dispatch = useAppDispatch();

  const {setDeleteOpen,setEditOpen,setProductId} = useContext(posContext);

  const handleDelete = ()=>{
    setDeleteOpen(true);
    setProductId(product.id);
  };

  const handleEdit = ()=>{
    setEditOpen(true);
    dispatch(fetchProduct(product))
  };

  const handleAddToCart = ()=>{

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
        <Typography gutterBottom variant="h5" component="div">
          {product.productName}
        </Typography>
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