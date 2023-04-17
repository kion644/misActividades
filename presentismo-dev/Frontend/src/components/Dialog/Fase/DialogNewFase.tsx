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

export const DialogNewFase = ({ open, setOpen, addProyecto, idProyecto }: any) => {
  const [newFase, setNewFase] = useState<string>("");
  const [newDescripcion, setNewDescripcion] = useState<string>("");
  const [proyectoId, setProyectoId] = useState<number> (idProyecto);
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  const handleDisable = (): boolean => {
    if (newFase && newDescripcion) {
      return false;
    }
    return true;
  };

  async function handleClickFinish() {
    handleClose();
    addProyecto(newFase,newDescripcion, idProyecto);
    setNewFase("");
    setNewDescripcion("");
  }

  return (
    <>
      <Dialog open={open} aria-labelledby="customized-dialog-title">
        <div className={classes.titulo}>
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Nueva Fase
          </DialogTitle>
        </div>
        <DialogContent dividers>
          <TextField
            name="newFase"
            margin="dense"
            label="Nombre"
            value={newFase}
            type="text"
            fullWidth
            variant="outlined"
            onChange={(e) => setNewFase(e.target.value)}
            
          />
          <TextField
            name="newDescripcion"
            margin="dense"
            label="Descripcion"
            value={newDescripcion}
            type="text"
            fullWidth
            variant="outlined"
            onChange={(e) => setNewDescripcion(e.target.value)}
            
          />
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
