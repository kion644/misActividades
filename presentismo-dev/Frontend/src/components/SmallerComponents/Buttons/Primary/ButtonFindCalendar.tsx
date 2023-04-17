import { makeStyles } from '@material-ui/core/styles';
import Button         from '@material-ui/core/Button';

interface textButton {
    text     : string;
    disabled : boolean;
    onClick : (  ) => void;

}

const useStyles = makeStyles({
    buttonPrimary: {
        color: '#FFFF',
        fontSize: '16px',
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem',
        textTransform: 'none',
        width: '100%',
        padding:'2px',
        backgroundColor:'#007DC4',
        '&:hover':{
            backgroundColor:'#F6921E'
        }
    },    
}); 
 
export const ButtonFindCalendar = ({ text, disabled, onClick }: textButton) => {
    

    const classes = useStyles();

    ;
    return (
        <Button  
            
            onClick=    { () => onClick() }
            className=  { classes.buttonPrimary}
            disabled=   { disabled              }
            variant=    "contained" 
           
            
        >
            { text }
        </Button>
    )
}
