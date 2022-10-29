import Cart from "./components/Cart";
import Products from "./components/Products";
import ProductsHeader from "./components/ProductsHeader";
import ProductsSearch from "./components/ProductsSearch";
import styles from "./styles/PosPage.module.css";
import FormModal from "../../utilities/components/FormModal";
import AddProductForm from "./components/AddProductForm";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import DeleteProductForm from "./components/DeleteProductForm";
import EditProductForm from "./components/EditProductForm";
import {Product } from "./posPageSlice";
import CartsModal from "./components/CartsModal";

export type PosPageContext = {
  setAddOpen: Dispatch<SetStateAction<boolean>>,
  setDeleteOpen:Dispatch<SetStateAction<boolean>>,
  setEditOpen:Dispatch<SetStateAction<boolean>>,
  setCartsOpen:Dispatch<SetStateAction<boolean>>,
  setProductId:Dispatch<SetStateAction<number>>,
  setProduct:Dispatch<SetStateAction<Product>>,
  product:Product,
  productId:number,
};

export const posContext = createContext<PosPageContext>({
  setAddOpen:()=>{},
  setDeleteOpen:()=>{},
  setEditOpen:()=>{},
  setProductId:()=>{},
  setCartsOpen:()=>{},
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

export type values = {
  searchText:string
};

const PosPageView = () => {
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
  const [cartsOpen,setCartsOpen] = useState(false);

  return (
      <posContext.Provider value={{setAddOpen,setDeleteOpen,setEditOpen,productId,setProductId,setCartsOpen,setProduct,product}}>
        <div className={styles['pos-page-wrapper']}>
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
          <DeleteProductForm />
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

      {
        cartsOpen && <FormModal 
        open={cartsOpen} 
        setOpen={setCartsOpen} 
        message="Choose a Cart Modal"
        >
          <CartsModal/>
        </FormModal>
      }

        <Cart/>
        
        <section className={styles['pos-main']}>
            <ProductsHeader/>
            <ProductsSearch />
            <Products/>
        </section>
    </div>
      </posContext.Provider>
  )
}

export default PosPageView