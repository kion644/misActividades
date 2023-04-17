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

export const DialogEditFase = ({
  open,
  setOpen,
  fase,
  setFase,
  editFase,
  idFase
}: any) => {
  const [nombre, setNombre] = useState<string>(fase.nombre);
  const [faseId, setFaseId] = useState<number>(idFase);
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  async function handleClickFinish() {
    handleClose();
    editFase(nombre,idFase);
  }

  return (
    <>
      <Dialog open={open} aria-labelledby="customized-dialog-title">
        <div className={classes.titulo}>
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Editar Fase
          </DialogTitle>
        </div>

        <DialogContent dividers>
          <TextField
            name="fase"
            margin="dense"
            label="Nombre"
            value={nombre}
            type="text"
            fullWidth
            variant="outlined"
            onChange={(event) => setNombre(event.target.value )}
          />
        </DialogContent>
        <DialogActions>
          <GroupButtonFinished
            cancelDisable={false}
            finishDisable={false}
            handleClickCancel={handleClose}
            handleClickFinish={handleClickFinish}
          ></GroupButtonFinished>
        </DialogActions>
      </Dialog>
    </>
  );
};
