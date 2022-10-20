import Alert, { AlertColor } from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import styles from "../styles/utils.module.css";

type AlertCardProps = {
    severity:AlertColor,
    title:string,
    msg:string
};

const AlertCard = ({severity,title,msg}:AlertCardProps) => {
  return (
    <div className={`${styles['alert-card']}`}>
        <Alert severity={severity} sx={{width:'85%'}}>
            <AlertTitle>{title}</AlertTitle>
            {msg}
        </Alert>
    </div>
  )
}

export default AlertCard