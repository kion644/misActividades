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
        marginTop: '1rem',
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem',
        textTransform: 'none',
        width: '90%',
        minWidth:'190px',
        padding:'2px',
        backgroundColor:'#007DC4',
        '&:hover':{
            backgroundColor:'#F6921E'
        }
    },    
}); 
 
export const ButtonPrimary = ({ text, disabled, onClick }: textButton) => {
    

    const classes = useStyles();

    return (
        <Button  
            
            onClick=    { () => onClick() }
            onKeyUp=    { (e) => {
               if( e.key=='13')
                {onClick()}
            } }
            className=  { classes.buttonPrimary}
            disabled=   { disabled              }
            variant=    "contained" 
           
            
        >
            { text }
        </Button>
    )
}
