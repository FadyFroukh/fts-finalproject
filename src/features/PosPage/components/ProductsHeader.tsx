import { Button, InputLabel } from "@mui/material";
import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../hooks/hooks";
import ZeroCount from "../../../utilities/components/ZeroCount";
import { fetchCategories, selectAllCategories } from "../posPageSlice";
import { posContext } from "../PosPageView";
import styles from "../styles/PosPage.module.css";
import HeaderSelect from "./HeaderSelect";

const ProductsHeader = () => {

    const {setAddOpen} = useContext(posContext);

    const handleOpen = ()=> setAddOpen(true);

    const categories = useSelector(selectAllCategories);

    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(fetchCategories());
    },[])

  return (
    <header className={styles['pos-header']}>
        <nav>
            <div className={styles['categories']}>
                <InputLabel>Filter By Category</InputLabel>
                {
                    categories.length > 0 ? 
                        <HeaderSelect items={categories}/>
                    : <ZeroCount message="No Current Categories"/>
                }
            </div>
            <div>
                <Button variant="contained" color="secondary" onClick={handleOpen}>
                    <b>Add Product</b>
                </Button>
            </div>
        </nav>
    </header>
  )
}

export default ProductsHeader