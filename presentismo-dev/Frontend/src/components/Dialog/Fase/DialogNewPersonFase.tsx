import { useEffect, useState } from "react";
import { GroupButtonFinished } from "../../SmallerComponents/Buttons/Group/GroupButtonFinished";
import { GridCloseIcon } from "@mui/x-data-grid";
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import { Dialog, IconButton, MenuItem, TextField, Typography } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import AllUsuarios from "../../../services/Usuarios/AllUsers";

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

export const DialogNewPersonFase = ({ open, setOpen, addProyecto,personas,idProyecto, idFase }: any) => {
  const [newUsuario, setNewUsuario] = useState<string>("");
  const [faseId, setFaseId] = useState<number>(idFase);
  const [proyectoId, setProyectoId] = useState<number>(idProyecto);
  const [datausuarios, setDataUsuarios] = useState<{
    nombre: string,
    apellido: string,
    id: number,
  }[]>([]);
  const classes = useStyles();
  const proyectsToDataUsuarios = async () => {
    setDataUsuarios(await AllUsuarios());
  };
  useEffect(() => {
    personas();
    proyectsToDataUsuarios();
  }, []);
  const optionsUsuarios = () => {

    return (
     datausuarios.map((a: {id:number, nombre: string, apellido: string}) =>
        
        <MenuItem value={`${a.apellido}, ${a.nombre}`}>{`${a.apellido}, ${a.nombre}`} </MenuItem>
      )
    )
}

  const handleClose = () => {
    setOpen(false);
    setNewUsuario('');
  };

  const handleDisable = (): boolean => {
    if (newUsuario) {
      return false;
    }
    return true;
  };

  async function handleClickFinish() {
    handleClose();
    addProyecto(newUsuario,proyectoId,faseId);
  }

  return (
    <>
      <Dialog open={open} aria-labelledby="customized-dialog-title">
        <div className={classes.titulo}>
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Nueva Persona a la Fase
          </DialogTitle>
        </div>
        <DialogContent dividers>
        <TextField
            id="select-person"
            select
            margin="dense"
            label="Personas"
            name="persona"
            fullWidth
            value={newUsuario}
            variant="outlined"
            onChange={(event)=>setNewUsuario(event.target.value)}
                >
                  {datausuarios.map((option: any) => (
                  <MenuItem key={option.id} value={option.id}>
                    {`${option.apellido}, ${option.nombre}`}
                  </MenuItem>
                ))}
                
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
