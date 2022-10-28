import { Button } from '@mui/material';
import { useContext } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import AlertCard from '../../../utilities/components/AlertCard';
import LoadingGIF from '../../../utilities/components/LoadingGIF';
import { fetchCategories } from '../../PosPage/posPageSlice';
import { deleteCategory, selectCategoriesSlice } from '../categoriesPageSlice';
import { CategoriesContext } from '../CategoriesPageView';
import styles from '../styles/CategoriesPage.module.css';

const DeleteCategory = () => {

    const dispatch = useAppDispatch();

    const {setDeleteOpen,categoryId} = useContext(CategoriesContext);

    const categoriesSlice = useAppSelector(selectCategoriesSlice);

    const handleDeleteCategory = ()=>{
        dispatch(deleteCategory(categoryId));
        setTimeout(()=>{
          dispatch(fetchCategories());
      },100)
    }

    const handleClose = ()=>{
        setDeleteOpen(false);
    };

  return (
    <div className={styles['delete-category']}>    
            {
                categoriesSlice.deleteCategoryLoading && <LoadingGIF/>
            }
            {
                !categoriesSlice.deleteCategoryLoading && categoriesSlice.deleteCategoryError ? 
                <AlertCard severity="error" title="Error!" msg={categoriesSlice.deleteCategoryError}/> : null
            }
            {
                !categoriesSlice.deleteCategoryLoading && categoriesSlice.deleteCategorySuccess ? 
                <AlertCard severity="success" title="Success!" msg={'Category Deleted Successfully!'}/> : null
            }
        <Button variant="contained" color="error" onClick={handleDeleteCategory}>Delete</Button>
        <Button variant="contained" color='primary' onClick={handleClose}>Forget it</Button>
    </div>
  )
}

export default DeleteCategory