import { createContext, Dispatch, SetStateAction, useState } from "react";
import FormModal from "../../utilities/components/FormModal";
import ProductsHeader from "./components/ProductsHeader"
import ProductsSearch from "../PosPage/components/ProductsSearch"
import { Product } from "../PosPage/posPageSlice";
import styles from './styles/ProductsPage.module.css';
import Products from "./components/Products";
import AddProductForm from "../PosPage/components/AddProductForm";
import EditProductForm from "../PosPage/components/EditProductForm";
import DeleteProductForm from "./components/DeleteProductForm";

export type ProductsPageContext = {
    setAddOpen: Dispatch<SetStateAction<boolean>>,
    setDeleteOpen:Dispatch<SetStateAction<boolean>>,
    setEditOpen:Dispatch<SetStateAction<boolean>>,
    setProductId:Dispatch<SetStateAction<number>>,
    setProduct:Dispatch<SetStateAction<Product>>,
    product:Product,
    productId:number,
  };
  
  export const ProductsPageContext = createContext<ProductsPageContext>({
    setAddOpen:()=>{},
    setDeleteOpen:()=>{},
    setEditOpen:()=>{},
    setProductId:()=>{},
    setProduct:()=>{},
    product:{
    id: 0,
    productCode: "",
    productName: "",
    productCategory: "",
    productImage: "",
    productPrice: 0,
    count: 0
  },
    productId:0
  });
  

const ProductsPageView = () => {
    const [addOpen,setAddOpen] = useState(false);
    const [deleteOpen,setDeleteOpen] = useState(false);
    const [editOpen,setEditOpen] = useState(false);
    const [productId,setProductId] = useState(0);
    const [product,setProduct] = useState({id: 0,
      productCode: "",
      productName: "",
      productCategory: "",
      productImage: "",
      productPrice: 0,
      count: 0});
  
  return (
    <ProductsPageContext.Provider value={{setAddOpen,setDeleteOpen,setEditOpen,productId,setProductId,setProduct,product}}>
        <section className={styles['products-main']}>
            {
            addOpen && 
            <FormModal 
                open={addOpen} 
                setOpen={setAddOpen}
                message="Add a Product"
                >
                <AddProductForm/>
            </FormModal>
        }
        {
            deleteOpen && <FormModal 
            open={deleteOpen} 
            setOpen={setDeleteOpen} 
            message="Delete a Product Modal"
            >
                <DeleteProductForm/>
            </FormModal>
        }
        {
            editOpen && <FormModal 
            open={editOpen} 
            setOpen={setEditOpen} 
            message="Edit a Product Modal"
            >
                <EditProductForm/>
            </FormModal>
        }

            <ProductsHeader/>
            <ProductsSearch/>
            <Products/>
        </section>
    </ProductsPageContext.Provider>
  )
}

export default ProductsPageView