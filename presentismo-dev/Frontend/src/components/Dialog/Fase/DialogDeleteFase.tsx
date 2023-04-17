import DeleteIcon from "@mui/icons-material/Delete";
import { GridCloseIcon } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogContentText,
  IconButton,
  Typography,
} from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogStyles from "../../../styles/Dialog/DialogStyles";

interface props {
  id: number;
  title: string;
  text: string;
  open: boolean;
  setOpen: (value: boolean) => void;
  deleteFunction: (value: number) => void;
}

export const DialogDelete = ({
  id,
  title,
  text,
  open,
  setOpen,
  deleteFunction,
}: props) => {
  const classes = DialogStyles();

  const handleClose = () => {
    setOpen(false);
  };

  const eliminar = () => {
    handleClose();
    deleteFunction(id);
  };

  return (
    <>
      <Dialog open={open}>
        <div className={classes.titulo}>
          <DialogTitle disableTypography className={classes.root}>
            <Typography variant="h6">{title}</Typography>
            <IconButton className={classes.closeButton} onClick={handleClose}>
              <GridCloseIcon />
            </IconButton>
          </DialogTitle>
        </div>
        <DialogContent className={classes.root}>
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
