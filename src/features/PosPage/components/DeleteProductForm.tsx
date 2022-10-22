import { Button } from "@mui/material"
import { Dispatch ,SetStateAction, useContext} from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import AlertCard from "../../../utilities/components/AlertCard";
import LoadingGIF from "../../../utilities/components/LoadingGIF";
import { deleteProduct,fetchProducts,selectPosPage,setProductAddLoading } from "../posPageSlice";
import { posContext } from "../PosPageView";
import styles from "../styles/PosPage.module.css";

type deleteProductProps = {
    setDeleteOpen:Dispatch<SetStateAction<boolean>>
}

const DeleteProductForm = ({setDeleteOpen}:deleteProductProps) => {

    const {productId} = useContext(posContext);

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