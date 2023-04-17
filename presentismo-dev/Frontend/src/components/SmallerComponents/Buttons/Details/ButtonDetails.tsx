import { makeStyles } from '@material-ui/core/styles';
import Button         from '@material-ui/core/Button';


interface textButton {
    text     : string;
    disabled : boolean;
    estilo   : any;
    onClick : () => void;
}

const useStyles = makeStyles({
  
}); 
 
export const ButtonDetails = ({ estilo,text, disabled, onClick }: textButton) => {

    const classes = useStyles();

   
 
    return (
     
        <Button  
            onClick=    { () => onClick()       }
            className=  { estilo                }
            disabled=   { disabled              }
            variant=    "contained" 
            color=      "secondary"
            
        >
            { text }
        </Button>
     
    )
}