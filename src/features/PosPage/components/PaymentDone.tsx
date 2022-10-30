import { Typography } from "@mui/material"
import styles from "../styles/PosPage.module.css";

const PaymentDone = () => {
  return (
    <div className={styles['payment-done']}>
        <img src='pictures/done.png' alt='Payment Proceeded Image'/>
        <Typography variant="body2" color='text.secondary'>Remember To Smile to the Customer!</Typography>
    </div>
  )
}

export default PaymentDone