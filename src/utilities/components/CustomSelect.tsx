import { Select,Box,InputLabel,MenuItem,FormControl,SelectChangeEvent } from "@mui/material"
import { useState,useEffect } from "react";
import { fetchCategories,selectAllCategories } from "../../features/PosPage/posPageSlice";
import { useAppDispatch,useAppSelector } from "../../hooks/hooks";


type CustomSelectProps = {
    field:object
}

const CustomSelect = ({field}:CustomSelectProps) => {
    
    const categories = useAppSelector(selectAllCategories);

    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(fetchCategories());
    },[]);
    
  return (
    <Box sx={{ minWidth: 120 }}>
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Product Category</InputLabel>
      <Select
        {...field}
        required
      >
        {
            categories.map(category=>(
                <MenuItem key={category.categoryId} value={category.categoryName}>{category.categoryName}</MenuItem>
            ))
        }
      </Select>
    </FormControl>
  </Box>
  )
}

export default CustomSelect