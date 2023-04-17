import { makeStyles } from '@material-ui/core';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import { ButtonPrimaryBis } from '../Primary/ButtonPrimaryBis';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
interface props {
  
    id:string;
    setOpen:(value:boolean)=> void;
    setOpenError:(value:boolean)=> void;
    setMessage:(value:string)=> void;
    setView:()=>void;
    setNew:()=>void;
}

const useStyles = makeStyles({
    align: {
       display:'flex',
    
    },
    button: {
        padding:'2px'

    },
});


export const ButtonGroupBitacora = ({ id,setOpen,setOpenError,setMessage,setView,setNew}: props) => {
    const classes = useStyles();

    return (
        <div className={classes.align}>
            <div className={classes.button}>
            <ButtonPrimaryBis
                text={'Ver'}
                disabled={false}
                onClick={setView}
                icon={<ZoomInIcon/>} 
                
            />
            </div>
            <div className={classes.button}>
            <ButtonPrimaryBis
                text={'Nueva'}
                disabled={false}
                onClick={setNew}
                icon={<AddCircleOutlineIcon/>}
            />
           </div>
        </div>
    )
}