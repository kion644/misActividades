import React from "react";
import { useEffect, useState } from "react";
import { GridCloseIcon } from "@mui/x-data-grid";
import { createStyles, makeStyles, Theme, withStyles, WithStyles } from "@material-ui/core/styles";
import { Card, Checkbox, Dialog, DialogContentText, Divider, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, TextField, Typography } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import MenuItem from "@mui/material/MenuItem";
import UsuariosDestinatarios from "./UsuariosDestinatarios";
import GetAllUsuarios from "../../../services/Usuarios/GetAllUsuarios";
import { GroupButtonCrear } from "../../SmallerComponents/Buttons/Group/GroupButtonCrear";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root2: {
      fontFamily: '"Montserrat", sans-serif',
    },
    titulo: {
      backgroundColor: "#007DC4",
      color: "#FFFF",
      fontSize: "100%",
      textAlign: "center",
      fontFamily: '"Montserrat", sans-serif',
    },
    selectAling: {
      marginLeft: "13px",
    },
    card: {
      height: "500px",
    },
    card1: {
      width: 'auto',
      height: "650px",
    },
    root1: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 'auto',
      },
    },
  })
);

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
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
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <GridCloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(1),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export const DialogNewDelegation = ({ open, setOpen, addDelegacion }: any) => {
  const classes = useStyles();
  
  const [accion, setaccion] = useState<string>("");
  const [listaDeUsuarios, setCurrency] = React.useState([0]);
  const [userSelected, setUserSelected] = useState<string>("");
  const [userChecked, setUserChecked] = useState<Number[]>([]);

  useEffect(() =>{
    GetAllUsuarios(0).then((result) => {
      setCurrency(result);

    })
    return () => {};
  },[]);

  const handleClose = () => {
    setaccion('');
    setUserChecked([])
    setUserSelected('')
    setOpen(false);
  };

  const handleUsuarioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserSelected(event.target.value);
  };

  const handleLicenciaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setaccion(event.target.value);
  };

  const handleDisable = (): boolean => {
    if (accion) {
      return false;
    }
    return true;
  };

  async function handleClickFinish() {
    addDelegacion(accion, userSelected, userChecked);
    handleClose();
  }



  return (
    <>
      <Dialog open={open} aria-labelledby="customized-dialog-title">
        <div className={classes.titulo}>
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Nueva delegacion
          </DialogTitle>
        </div>
        <DialogContent dividers className={classes.card1}>
          <Grid container spacing={3} xs={12} >
            <Grid item xs={6}>
              <TextField 
              id="standard-select-currency" 
              select 
              label="Usuario" 
              value={userSelected} 
              onChange={handleUsuarioChange} 
              helperText="Por favor Seleccione el usuario a delegar">
                {listaDeUsuarios.map((option: any) => (
                  <MenuItem key={option.id} value={option.id}>
                    {`${option.apellido}, ${option.nombre}`}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField id="standard-select-currency" select label="Accion" value={accion} onChange={handleLicenciaChange} helperText="Por favor Seleccione la accion a delegar">
                <MenuItem key="LICENCIAS" value="LICENCIAS">Licencias</MenuItem>
                <MenuItem key="CAMBIO_HORARIO" value="CAMBIO_HORARIO">Cambio Horario</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} >
              <DialogContent dividers className={classes.card} >
                <DialogContentText > Seleccione destinatarios :</DialogContentText>
                <UsuariosDestinatarios checked={userChecked} setChecked={setUserChecked} />              
              </DialogContent>
            </Grid>         
          </Grid>
        </DialogContent>
        <DialogActions>
          <GroupButtonCrear cancelDisable={false} finishDisable={handleDisable()} handleClickCancel={handleClose} handleClickFinish={handleClickFinish}></GroupButtonCrear>
        </DialogActions>               
      </Dialog>
    </>
  );
};
