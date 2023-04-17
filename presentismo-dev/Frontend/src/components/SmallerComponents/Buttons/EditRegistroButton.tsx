import { makeStyles } from '@material-ui/core/styles';
import Button         from '@material-ui/core/Button';
import EditIcon from "@mui/icons-material/Edit"

interface textButton {
  
    onClick : (  ) => void;

}

const useStyles = makeStyles({
    buttonPrimary: {
        color: '#FFFF',
        fontSize: '16px',
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem',
        textTransform: 'none',
        width: '50%',
        padding:'2px',
        backgroundColor:'#007DC4',
        '&:hover':{
            backgroundColor:'#F6921E'
        }
    },    
}); 
 
export const EditRegistroButton = ({ onClick }: textButton) => {
    

    const classes = useStyles();

    ;
    return (
        <Button  
            
            onClick=    { () => onClick() }
            className=  { classes.buttonPrimary}
            variant=    "contained" 
           
            
        >
        <EditIcon></EditIcon>
        </Button>
    )
}