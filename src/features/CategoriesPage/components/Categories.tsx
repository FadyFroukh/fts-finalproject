import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks"
import ZeroCount from "../../../utilities/components/ZeroCount";
import { fetchCategories, selectCategoriesSlice } from "../categoriesPageSlice";
import PageCategory from "./PageCategory";
import styles from '../styles/CategoriesPage.module.css';

const Categories = () => {

    const categoriesSlice = useAppSelector(selectCategoriesSlice);
    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(fetchCategories());
    },[]);

  return (
    <div className={styles['categories-body']}>
        {
            categoriesSlice.mappedCategories.length > 0 ? 
            categoriesSlice.mappedCategories.map(category=>(
                <PageCategory key={category.id} category={category}/>
            )) : <ZeroCount message="No Current Categories"/>
        }
    </div>
  )
}

export default Categories