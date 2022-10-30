import { Button, Typography } from "@mui/material"
import { useContext } from "react";
import { CategoriesContext } from "../CategoriesPageView";
import styles from "../styles/CategoriesPage.module.css";

const CategoriesHeader = () => {

    const {setAddOpen} = useContext(CategoriesContext);

  return (
    <header className={styles['categories-header']}>
        <Typography variant="h5">Categories Management</Typography>
        <Button 
        variant="contained" 
        color='secondary'
        onClick={()=> setAddOpen(true)}
        >
            Add Category
        </Button>
    </header>
  )
}

export default CategoriesHeader