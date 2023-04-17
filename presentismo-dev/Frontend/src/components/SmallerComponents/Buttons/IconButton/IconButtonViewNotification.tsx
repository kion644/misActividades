import { makeStyles } from '@material-ui/core/styles';
import { Badge, IconButton } from '@material-ui/core';
import NotificationsIcon from '@mui/icons-material/Notifications';


interface textButton {
  setOpen:(value:number)=>void;
id:number;
notifications: number;
}

const useStyles = makeStyles({
    buttonPrimary: {
        color: '#007DC4',
        '&:hover':{
            color:'#F6921E'
        }
    },    
}); 
 
export const IconButtonViewNotification = ({ notifications, setOpen,id}: textButton) => {
    

    const classes = useStyles();
    return (
        <NotificationsIcon 
        className={classes.buttonPrimary}
          onClick={()=>setOpen(id)} >
             <Badge
        color="error"
        overlap='circular'
        variant='dot'
        badgeContent={notifications}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
        }}
        >
        
        </Badge>
        </NotificationsIcon> 
    )
}
