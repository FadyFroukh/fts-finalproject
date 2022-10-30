import { TextField , Box} from "@mui/material";

type InputLabelFadeProps = {
    field:object,
    type:string
};

const InputLabelFade = ({field,type}:InputLabelFadeProps)=>{
    return(
        <Box
        component="div"
        sx={{
          '& .MuiTextField-root': {margin:'8px 0',width: '25ch' },
        }}
        >
            <TextField
            required
            label="Enter Value Here"
            {...field}
            type={type}
            autoComplete='off'
            />
        </Box>
    );
};

export default InputLabelFade;