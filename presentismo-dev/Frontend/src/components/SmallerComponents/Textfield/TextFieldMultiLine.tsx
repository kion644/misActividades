import { Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useStyles } from '@material-ui/pickers/views/Calendar/SlideTransition';

const styles = (theme: Theme) =>{
    root :{

    }
    
}
interface props{
    texto:string;
    setTexto:(value:string)=>void;
}

export default function TextFieldMultiLine({setTexto,texto}:props) {

    const classes=useStyles(styles);
    const handleChange = (event:any) => {
        setTexto(event.target.value);
       
      };

    return (

        <TextField
            id="outlined-multiline-static"
            label="Observación"
            multiline
            rows={2}

            value={texto}
            variant="outlined"
            onChange={handleChange}
            fullWidth={true}
            inputProps={{maxLength: 255}}
        />

    )
}