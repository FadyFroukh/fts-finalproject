import { DeleteForever, Edit } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import Action from "../../../utilities/components/Action";
import Actions from "../../../utilities/components/Actions";
import ZeroCount from "../../../utilities/components/ZeroCount";
import { Category } from "../../PosPage/posPageSlice";
import { fetchProductsByCategory, selectProductsByCategory } from "../categoriesPageSlice";
import { CategoriesContext } from "../CategoriesPageView";
import styles from '../styles/CategoriesPage.module.css';
import CategoryProduct from "./CategoryProduct";
type PageCategoryProps = {
    category:Category
};

const PageCategory = ({category}:PageCategoryProps) => {

    const {setDeleteOpen,setEditOpen,setCategory,setCategoryId} = useContext(CategoriesContext);

    const handleEditOpen = (id:number)=>{
        setCategory(category);
        setEditOpen(true);    
    }

    const handleDeleteOpen = (id:number)=>{
        setCategoryId(id);
        setDeleteOpen(true);
    };

    const dispatch = useAppDispatch();

    const fetchedProducts = useAppSelector(selectProductsByCategory);
  
    useEffect(()=>{
      dispatch(fetchProductsByCategory());
    },[]);


  return (
    <div className={styles['category']}>
        <header className={styles['category-header']}>
            <Typography variant="body1"># {category.id} {category.categoryName}</Typography>
            <div>
                <Actions>
                    <Action color='error' onClick={()=>handleDeleteOpen(category.id)}>
                        <DeleteForever/>
                    </Action>
                    <Action color='success' onClick={()=>{handleEditOpen(category.id)}}>
                        <Edit/>
                    </Action>
                </Actions>
            </div>
        </header>
        <div className={styles['category-products']}>
            {
                fetchedProducts.length > 0 ? 
                    fetchedProducts.map(product=> (
                        product.productCategory === category.categoryName ? <CategoryProduct product={product} key={product.id}/> : null
                    ))
                : <ZeroCount message="No Current Products"/>
            }
        </div>
    </div>
  )
}

export default PageCategory