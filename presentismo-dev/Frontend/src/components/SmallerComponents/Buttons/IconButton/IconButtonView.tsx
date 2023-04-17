import { makeStyles } from '@material-ui/core/styles';
import { Badge, IconButton } from '@material-ui/core';

interface textButton {
  setOpen:(value:number)=>void;
 icon:any;
id:number;
}

const useStyles = makeStyles({
    buttonPrimary: {
        color: '#007DC4',
        '&:hover':{
            color:'#F6921E'
        }
    },    
}); 
 
export const IconButtonView = ({ setOpen,icon,id}: textButton) => {
    

    const classes = useStyles();
    return (
        <IconButton 
        className={classes.buttonPrimary}
          onClick={()=>setOpen(id)} >
              {icon}
        </IconButton>
    )
}
