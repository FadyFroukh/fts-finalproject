import { Button } from "@mui/material"
import {useContext} from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import AlertCard from "../../../utilities/components/AlertCard";
import LoadingGIF from "../../../utilities/components/LoadingGIF";
import { deleteProduct,fetchProducts,selectPosPage,setProductAddLoading } from "../../PosPage/posPageSlice";
import { ProductsPageContext } from "../ProductsPageView";
import styles from "../styles/ProductsPage.module.css";


const DeleteProductForm = () => {

    const {productId,setDeleteOpen} = useContext(ProductsPageContext);

    const posPage = useAppSelector(selectPosPage);

    const dispatch = useAppDispatch();

    const handleDeleteProduct = ()=>{
        dispatch(setProductAddLoading());
        setTimeout(()=>{
            dispatch(deleteProduct(productId));
            setTimeout(()=>{
                dispatch(fetchProducts());
                setDeleteOpen(false);
            },1000)
        },3000);

    };

    const handleClose = ()=>setDeleteOpen(false);


  return (
    <>
    {
        posPage.productLoading && <LoadingGIF/>
    }
    {
        !posPage.productLoading && posPage.deleteProductError ? <AlertCard severity="error" title="Error!" msg={posPage.deleteProductError}/> : null
    }
    {
        !posPage.productLoading && posPage.deleteProductSuccess ?  <AlertCard severity="success" title="Product Deleted!" msg={"Product Deleted Successfully"}/>:  null
    }
    <div className={styles['delete-product-form']}>    
        <Button variant="contained" color="error" onClick={handleDeleteProduct} disabled={posPage.deleteProductSuccess.length > 0}>Delete</Button>
        <Button variant="contained" color='primary' onClick={handleClose}>Forget it</Button>
    </div>
    </>
  )
}

export default DeleteProductForm