import { Button } from "@mui/material"
import { ReactNode } from "react"

type ActionProps = {
    children:ReactNode,
    color:string,
    onClick:()=>void;
};

const Action = ({children,color,onClick}:ActionProps) => {
  return (
    <Button size='small' variant="contained" color={color} onClick={onClick}>
        {children}
    </Button>
  )
}

export default Action