import {Card,CardActions,CardContent,CardMedia,Typography } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Actions from "../../../utilities/components/Actions";
import Action from "../../../utilities/components/Action";
import { useContext } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { Box } from "@mui/system";
import { Product } from "../../PosPage/posPageSlice";

type productProps = {
  product:Product
}

const CategoryProduct = ({product}:productProps) => {
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
        <Box sx={{display:'flex',justifyContent:'space-between'}}>
            <Typography variant="body2" color="text.secondary">
                {product.productCategory}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {product.productCode}
            </Typography>
        </Box>
      </CardContent>
      <CardActions>
        
      </CardActions>
    </Card>
  )
}

export default CategoryProduct;