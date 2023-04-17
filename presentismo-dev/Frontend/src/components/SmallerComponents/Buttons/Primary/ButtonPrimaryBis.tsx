
import { makeStyles } from '@material-ui/core/styles';
import Button         from '@material-ui/core/Button';

interface textButton {
    text     : string;
    disabled : boolean;
    onClick  : (  ) => void;
    icon     : any;
}

const useStyles = makeStyles({
    buttonPrimary: {
        color: '#FFFF',
        fontSize: '16px',
        marginTop: '1rem',
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem',
        textTransform: 'none',
        width: '25%',
        minWidth:'100px',
        backgroundColor:'#007DC4',
        '&:hover':{
            backgroundColor:'#F6921E'
        }
    },    
}); 
 
export const ButtonPrimaryBis = ({ text, disabled, onClick,icon}: textButton) => {
    

    const classes = useStyles();

    
    return (
        <Button  
            endIcon=    { icon }
            onClick=    { () => onClick() }
            className=  { classes.buttonPrimary}
            disabled=   { disabled              }
            variant=    "contained" 
            title=      { '' }
            
        >
            { text }
        </Button>
    )
}
