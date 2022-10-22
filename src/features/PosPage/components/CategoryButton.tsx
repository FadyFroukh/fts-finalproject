import { Button } from '@mui/material'
import { useAppDispatch } from '../../../hooks/hooks'
import { Category,filterByCategory } from '../posPageSlice'

type categoryButtonProps = {
    category:Category,
}

const CategoryButton = ({category}:categoryButtonProps) => {

    const dispatch = useAppDispatch();

    const handleFilterByCategory = (category:Category)=>{
        dispatch(filterByCategory(category));
    };

  return (
    <Button 
        variant="contained"
        sx={{marginRight:'8px',minWidth:'100px'}}
        onClick={()=>handleFilterByCategory(category)}
        >
        <b>{category.categoryName}</b>
    </Button>
  )
}

export default CategoryButton