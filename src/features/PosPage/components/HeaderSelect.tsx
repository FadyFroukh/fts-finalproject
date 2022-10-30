import {Select,Box,InputLabel,MenuItem,FormControl,SelectChangeEvent } from "@mui/material"
import { useState } from "react";
import { useAppDispatch } from "../../../hooks/hooks";
import {Category, filterByCategory} from "../posPageSlice";

type CustomSelectProps = {
    items:Category[]
}

const HeaderSelect = ({items}:CustomSelectProps) => {

    const dispatch = useAppDispatch();

    const [value, setValue] = useState('');
    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value as string);
        dispatch(filterByCategory(event.target.value));
    };
    
  return (
    <Box sx={{ minWidth: 120 }}>
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Product Category</InputLabel>
      <Select
        value={value}
        onChange={handleChange}
      >
        {
            items.map(category=>(
                <MenuItem key={category.categoryId} value={category.categoryName}>{category.categoryName}</MenuItem>
            ))
        }
      </Select>
    </FormControl>
  </Box>
  )
}

export default HeaderSelect;