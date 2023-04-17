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
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
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

export const DialogNewAvailability = ({
  open,
  setOpen,
  addAvailability,
  checked,
  setChecked,

}: any) => {
  const [newUsuario, setNewUsuario] = useState<string>("");
  const [newDisponibilidad, setNewDisponibilidad] = useState<string>("");
  const classes = useStyles();

  // const handleChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
  //   setChecked(event.target.checked);
  // };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDisable = (): boolean => {
     if (newUsuario && newDisponibilidad) 
    {
      return false;
    }

    return true;
  };

   async function handleClickFinish() {
     handleClose();
     addAvailability(newUsuario, newDisponibilidad);
     setNewUsuario("");
     setNewDisponibilidad("");
    }

  return (
    <>
        <Dialog  open={open} aria-labelledby="customized-dialog-title">
          <div className={classes.titulo}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
              Nueva disponibilidad
            </DialogTitle>
          </div>
          <DialogContent  dividers>
            <TextField
              name="usuario"
              margin="dense"
              label="Usuario"
              value={newUsuario}
              type="text"
              fullWidth
              variant="outlined"
              onChange={(e) => setNewUsuario(e.target.value)}
            />
          </DialogContent>
          <DialogContent>
              <TextField
                name="disponibilidad"
                margin="dense"
                label= "Disponibilidad"
                value={newDisponibilidad}
                type="text"
                fullWidth
                variant="outlined"
                onChange={(e) => setNewDisponibilidad(e.target.value)}
              >
              </TextField>
            </DialogContent>
            <DialogContent>
            <FormGroup >
              <FormControlLabel control={<Checkbox defaultChecked />} label="Lunes" />
              <FormControlLabel control={<Checkbox defaultChecked />} label="Martes" />
              <FormControlLabel control={<Checkbox defaultChecked />} label="Miercoles" />
              <FormControlLabel control={<Checkbox defaultChecked />} label="Jueves" />
              <FormControlLabel control={<Checkbox defaultChecked />} label="Viernes" />
             </FormGroup>
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
