import DeleteIcon from "@mui/icons-material/Delete";
import { GridCloseIcon } from "@mui/x-data-grid";
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogContentText,
  IconButton,
  Typography,
} from "@material-ui/core";
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
    cancelButton: {
      color: "#FFFF",
      fontSize: "16px",
      paddingTop: "0.5rem",
      paddingBottom: "0.5rem",
      textTransform: "none",
      width: "90%",
      minWidth: "190px",
      padding: "2px",
      backgroundColor: "#007DC4",
      "&:hover": {
        backgroundColor: "#F6921E",
      },
    },
    deleteButton: {
      color: "#FFFF",
      fontSize: "16px",
      paddingTop: "0.5rem",
      paddingBottom: "0.5rem",
      textTransform: "none",
      width: "90%",
      minWidth: "190px",
      padding: "2px",
      backgroundColor: "#007DC4",
      "&:hover": {
        backgroundColor: "#FB0000",
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
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

interface props {
  id: any;
  title: string;
  text: string;
  open: boolean;
  setOpen: (value: boolean) => void;
  deleteFunction: (value: any) => void;
}

export const DialogDeleteProyecto = ({
  id,
  title,
  text,
  open,
  setOpen,
  deleteFunction,
}: props) => {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  const eliminar = () => {
    handleClose();
    deleteFunction(id);
  };

  return (
    <>
      <Dialog open={open} aria-labelledby="customized-dialog-title">
        <div className={classes.titulo}>
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            {title}
          </DialogTitle>
        </div>
        <DialogContent>
          <DialogContentText
            style={{
              color: "#000",
              display: "flex",
              justifyContent: "center",
              margin: "8px",
            }}
          >
            {text}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleClose}
            className={classes.cancelButton}
            variant="contained"
          >
            Cancelar
          </Button>
          <Button
            onClick={eliminar}
            className={classes.deleteButton}
            startIcon={<DeleteIcon />}
            variant="contained"
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
