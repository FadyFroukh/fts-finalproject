import { Typography } from "@mui/material";
import styles from "../styles/utils.module.css";

type ZeroCountProps = {
    message:string
};

const ZeroCount = ({message}:ZeroCountProps) => {
  return (
    <div className={styles['zero-count']}>
        <Typography>{message}</Typography>
    </div>
  )
}

export default ZeroCount