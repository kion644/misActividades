import React from "react";
import { useEffect, useState } from "react";
import { GridCloseIcon } from "@mui/x-data-grid";
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import { Card, Dialog, DialogContentText, Grid, IconButton, TextField, Typography } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import UsuariosDestinatarios from "./UsuariosDestinatarios";
import { GroupButtonFinished } from "../../SmallerComponents/Buttons/Group/GroupButtonFinished";







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
      height:'500px',
    },
    dialog: {
      height:'flex',
      width:'flex',
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

export const DialogEditDestinatarios = ({ open, setOpen, addDelegacion, delegacion }: any) => {
  const classes = useStyles();
  const [userChecked, setUserChecked] = useState<Number[]>([]);


  useEffect(() => {
    if (delegacion != null){
      setUserChecked(delegacion.usuariosDestinatarios.map((row: any) => { return row.destinatario.id }));
    }
  
    return () => {}
  }, [delegacion])

  const handleClose = () => {
    // setUserChecked([])
    setOpen(false);
  };

  const handleDisable = (): boolean => {
    return false;
  };

  async function handleClickFinish() {
    addDelegacion(delegacion, userChecked);
    setOpen(false);
  }

  return (
    <>
     
      <Dialog open={open} aria-labelledby="customized-dialog-title">
        <div className={classes.titulo}>
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Editar destinatarios
          </DialogTitle>
        </div>
        <Grid container spacing={3} xs={12}>
          <Grid item xs={12}>
            <DialogContent dividers className={classes.card}>
              <DialogContentText > Seleccione destinatarios a agregar:</DialogContentText>
              <UsuariosDestinatarios delegacion={delegacion} checked={userChecked} setChecked={setUserChecked} />
            </DialogContent>
          </Grid>
        </Grid>     
        <DialogActions>
          <GroupButtonFinished
            cancelDisable={false}
            finishDisable={handleDisable()}
            handleClickCancel={handleClose}
            handleClickFinish={handleClickFinish}
          ></GroupButtonFinished>
        </DialogActions>               
      </Dialog>
      
    </>
  );
};
