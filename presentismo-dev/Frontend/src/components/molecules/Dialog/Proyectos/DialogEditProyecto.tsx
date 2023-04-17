import { GroupButtonFinished } from "../../../SmallerComponents/Buttons/Group/GroupButtonFinished";
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
  nombre: string;
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

export const DialogEditProyecto = ({
  open,
  setOpen,
  proyecto,
  setProyecto,
  editProyecto,
}: any) => {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  async function handleClickFinish() {
    handleClose();
    editProyecto(proyecto);
  }

  return (
    <>
      <Dialog open={open} aria-labelledby="customized-dialog-title">
        <div className={classes.titulo}>
          <DialogTitle nombre="customized-dialog-title" onClose={handleClose}>
            Editar Proyecto
          </DialogTitle>
        </div>
        <DialogContent dividers>
          <TextField
            name="nombre"
            margin="dense"
            label="Nombre"
            value={proyecto.editedName}
            type="text"
            fullWidth
            variant="outlined"
            onChange={(e) => setProyecto({ ...proyecto, editedName: e.target.value })}
          />
          <TextField
            name="descripcion"
            margin="dense"
            label="Descripcion"
            value={proyecto.editedDescription}
            type="text"
            fullWidth
            variant="outlined"
            onChange={(e) => setProyecto({ ...proyecto, editedDescription: e.target.value })}
            />
          <TextField
            disabled
            name="tipoProyecto"
            margin="dense"
            label="Tipo"
            value={proyecto.editedType}
            type="text"
            fullWidth
            variant="outlined"
            onChange={(e) => setProyecto({ ...proyecto, editedType: e.target.value })}
            />
          <TextField
            name="Id Cliente"
            margin="dense"
            label="Id Cliente"
            value={proyecto.editedClient}
            type="text"
            fullWidth
            variant="outlined"
            onChange={(e) => setProyecto({ ...proyecto, editedClient: e.target.value })
            }
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
