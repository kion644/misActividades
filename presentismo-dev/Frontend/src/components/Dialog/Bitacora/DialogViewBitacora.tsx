import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import CantidadSolicitudesBita from '../../../services/Solicitudes/CantidadSolicitudesBita';
import { ButtonPrimary } from '../../SmallerComponents/Buttons/Primary/ButtonPrimary';
import TableBitacora from '../../Tables/Bitacora/TableBitacora';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root2: {
            fontFamily: '"Montserrat", sans-serif',
        },
        titulo: {
            backgroundColor: '#007DC4',
            color: '#FFFF',
            fontSize: '100%',
            textAlign: 'center',
            fontFamily: '"Montserrat", sans-serif',
        },
        center: {
            textAlign: 'center',
        }

    })
);
const styles = (theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            padding: theme.spacing(2),

        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
    });

export interface DialogTitleProps extends WithStyles<typeof styles> {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);
interface prop {
    setCerrar: (value: boolean) => void;
    newBitacora:(value: boolean) =>void;
    setChange: (value: boolean) =>void;
    id:number;
    idUser:number;
}

export default function DialogViewBitacora({ setCerrar,newBitacora,id,idUser, setChange}: prop) {

    const classes = useStyles();
    const [refrescar, setRefrescar] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
  
    async function handleClickFinish() {
        setCerrar(false);
    };

    useEffect(() => {
     
        setIsLoading(false);
    
       
        
    }, []);

    useEffect(()=>{
        async function CantidadBitas(){
         const response: any = await CantidadSolicitudesBita();
         if(response.status===200){
   
           localStorage.setItem("Bitas", response.data);
         }
        }
        CantidadBitas();
        
    },[refrescar])


    

    async function nuevo() {
        newBitacora(true);
    };
    return (

        <div className={classes.root2}>
            {isLoading ? (
                null
            ) : (<>
                <Dialog onClose={handleClickFinish} aria-labelledby="customized-dialog-title" open={true}
                    maxWidth='xl'>
                    <div className={classes.titulo}>
                        <DialogTitle id="customized-dialog-title" onClose={handleClickFinish}  >
                            Observaciones
                        </DialogTitle>
                    </div>

                    <DialogContent dividers>
                        <TableBitacora id={id} setChange={setChange}/>
                    </DialogContent>
                    <DialogActions >
                        <Grid container className={classes.center}>
                            <Grid xs={6}>
                                <ButtonPrimary
                                    text={'Cerrar'}
                                    disabled={false}
                                    onClick={handleClickFinish}
                                />
                            </Grid>
                            <Grid xs={6}>
                                <ButtonPrimary
                                    text={'Nueva'}
                                    disabled={false}
                                    onClick={nuevo}
                                />
                            </Grid>
                        </Grid>
                    </DialogActions>
                </Dialog>
            
            </>
            )}
        </div>
    );
}