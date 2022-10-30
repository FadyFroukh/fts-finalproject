import {Box,Modal,Typography} from '@mui/material';
import { ReactNode } from 'react';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    display:'flex',
    flexDirection:'column',
    justifiyContent:'center',
    alignItems:'center',
    borderRadius:'12px',
};

type FormModalProps = {
    open:boolean,
    setOpen:(open:boolean)=>void,
    children:ReactNode,
    message:string
};

const FormModal = ({open,setOpen,children,message}:FormModalProps) => {
    const handleClose = () => setOpen(false);
  return (
    <div>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
            {message}
        </Typography>
        {children}
        </Box>
    </Modal>
    </div>
  )
}

export default FormModal