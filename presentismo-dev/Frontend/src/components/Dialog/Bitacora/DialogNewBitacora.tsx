
import React, { useContext, useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

import { AxiosError } from 'axios';
import { environment } from '../../../enviroment/enviroment';
import { useNavigate } from 'react-router-dom';
import { roles } from '../../../enviroment/roles';
import Context from '../../../hooks/UseContext/Solicitudes';
import { mensaje } from '../../../models/Mensaje';
import { personaBitacora } from '../../../models/PersonaBitacora';
import NuevaBitacora from '../../../services/Bitacora/NuevaBitacora';
import obtenerInformacionLicencia from '../../../services/Licencias/obtenerInformacionLicencia';
import { GroupButtonFinished } from '../../SmallerComponents/Buttons/Group/GroupButtonFinished';
import { SelectPersonaBitacora } from '../../SmallerComponents/Select/SelectPersonaBitacora';
import TextFieldMultiLine from '../../SmallerComponents/Textfield/TextFieldMultiLine';


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
        selectAling: {
            marginLeft: '13px'
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
        }
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
    setOpen: (value: boolean) => void;
    setOpenError: (value: boolean) => void;
    setMessage: (value: string) => void;
    setChange: (value: boolean) => void;
    id: number;
}

export default function DialogNewBitacora({ setCerrar, id, setOpen, setOpenError, setMessage, setChange }: prop) {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(true);
    const [texto, setTexto] = useState('');
    const [destinatario, setDestinatario] = useState("")
    const [label, setLabel] = useState("");
    const [licencia, setLicencia] = useState('');
    const temp = useContext(Context);
    const [solicitudes] = useState(temp);
    const [data, setData] = useState<personaBitacora[]>([]);
    const navigate = useNavigate();


    const handleClose = () => {
        setCerrar(false)
    };
    useEffect(() => {
        setIsLoading(false);
        async function loadDetails() {
            const response: any = await obtenerInformacionLicencia(id);
            try {
                if (response.status === 200) {
                    setData(response.data);

                    
                    
    
                } else {
                    setData([]);
                }
            } catch (error) {
    
            }

        }
        loadDetails();

    }, []);
    

  


    async function handleClickFinish() {

     
        let lider: string = "";
        
        data.forEach((a: any) => {
            if(a.rol === "LIDER"){
                lider = (a.username);
            }
        })



        let bita: mensaje;


             if(localStorage.getItem('301') == roles.ROLCOMUN){
                  bita = new mensaje(
                     texto,
                     lider
                     )
             }
         else{
              bita = new mensaje(
                 texto,
                 destinatario
                 )

         }

          try {

              const response: any = await NuevaBitacora(id, bita);

              if (response.status == 200) {
                  setOpen(true)
                  setMessage("Observación creada")
                  setCerrar(false)
                  setChange(true);


              } else {
                  setMessage("Error al crear la observación")
                  setOpenError(true)
                  setCerrar(false)
              }

          } catch (error) {

              const err = error as AxiosError
              if (err.response?.status === 403) {
                  setOpenError(true);
                  localStorage.clear();
                  sessionStorage.clear();
                  window.location.reload();
                  navigate(environment.LOGIN);
              }

          }




    };

    const leaderSelectScreen = () => {
        if (localStorage.getItem('301') == roles.ROLATENCION || localStorage.getItem('301') == roles.ROLLIDER) {
            return (
                <Grid container direction="column" justifyContent="center" alignItems="flex-start">
                    <Grid item xs={12} className={classes.selectAling}>
                        <SelectPersonaBitacora data={data} disable={false} label={label} setLabel={setLabel} setCombo={setDestinatario}></SelectPersonaBitacora>
                    </Grid>
                </Grid>
            )
        }
        else {
            return;
        }
    }
    const handleDisable = (): boolean => {


        if(localStorage.getItem('301') != roles.ROLCOMUN){
            if (texto && destinatario) {
                return false;
            }
    
            return true;
        }

        else{
            if (texto) {
                return false;
            }
    
            return true;

        }
        

       
    }
    return (

        <div className={classes.root2}>
            {isLoading ? (
                null
            ) : (
                <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={true}
                    maxWidth='xl'>
                    <div className={classes.titulo}>
                        <DialogTitle id="customized-dialog-title" onClose={handleClose}  >
                            Nueva Observación
                        </DialogTitle>
                    </div>

                    <DialogContent dividers>

                        <Grid container>
                            <Grid xs={12}>
                                <TextFieldMultiLine setTexto={setTexto} texto={texto}></TextFieldMultiLine>
                            </Grid>
                        </Grid>

                    </DialogContent>

                    <>
                        {leaderSelectScreen()}
                        <DialogContent dividers></DialogContent>
                    </>
                    <DialogActions >
                        <GroupButtonFinished
                            cancelDisable={false}
                            finishDisable={handleDisable()}
                            handleClickCancel={handleClose}
                            handleClickFinish={handleClickFinish}
                        ></GroupButtonFinished>
                    </DialogActions>
                </Dialog>

            )}
        </div>
    );
}