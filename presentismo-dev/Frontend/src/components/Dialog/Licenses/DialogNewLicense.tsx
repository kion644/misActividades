import { useState } from "react";

import { GridCloseIcon } from "@mui/x-data-grid";
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import { Dialog, IconButton, TextField, Typography } from "@material-ui/core";

import { MenuItem} from "@mui/material";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
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
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export const DialogNewLicense = ({
  open,
  setOpen,
  addLicense
}: any) => {
  const [newDescripcion, setNewDescripcion] = useState<string>("");
  const [newNombre, setNewNombre] = useState<string>("");
  const [newTipo, setNewTipo] = useState<string>("");
  const [newEstado, setNewEstado] = useState<string>("");
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  const handleDisable = (): boolean => {
    if ( newDescripcion && newNombre && newTipo && newEstado)
    {
      return false;
    }

    return true;
  };

   async function handleClickFinish() {
     handleClose();
     addLicense(newDescripcion, newNombre, newTipo, newEstado);
     setNewDescripcion("");
     setNewNombre("");
     setNewTipo("");
     setNewEstado("");
    }

  return (
    <>
        <Dialog  open={open} aria-labelledby="customized-dialog-title">
          <div className={classes.titulo}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
              Nuevo tipo de licencia
            </DialogTitle>
          </div>
          <DialogContent dividers>
              <TextField
                name="descripcion"
                margin="dense"
                label= "Descripcion"
                value={newDescripcion}
                type="text"
                fullWidth
                variant="outlined"
                onChange={(e) => setNewDescripcion(e.target.value)}
              >
              </TextField>
            </DialogContent>
          <DialogContent  dividers>
            <TextField
              name="nombre"
              margin="dense"
              label="Nombre"
              value={newNombre}
              type="text"
              fullWidth
              variant="outlined"
              onChange={(e) => setNewNombre(e.target.value)}
            />
          </DialogContent>
          <DialogContent dividers>
            <TextField
                select
                name="tipo"
                margin="dense"
                value={newTipo}
                label="Tipo"
                type="text"
                fullWidth
                variant="outlined"
                onChange={(e) => setNewTipo(e.target.value)}
              >
                <MenuItem value={"PRODUCTIVA"}>PRODUCTIVA</MenuItem>
            <MenuItem value={"LICENCIA"}>LICENCIA</MenuItem>
              </TextField>
            </DialogContent>
            <DialogContent dividers>
            <TextField
                select
                name="estado"
                margin="dense"
                value={newEstado}
                label="Estado"
                type="text"
                fullWidth
                variant="outlined"
                onChange={(e) => setNewEstado(e.target.value)}
              >
                <MenuItem value={"ACTIVO"}>ACTIVO</MenuItem>
              <MenuItem value={"DESACTIVO"}>DESACTIVO</MenuItem>
              </TextField>
            </DialogContent>

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
