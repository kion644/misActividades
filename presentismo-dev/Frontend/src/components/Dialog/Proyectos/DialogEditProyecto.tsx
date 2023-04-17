import { GridCloseIcon } from "@mui/x-data-grid";

import {useEffect, useState } from "react";
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
import { GroupButtonFinished } from "../../SmallerComponents/Buttons/Group/GroupButtonFinished";
import getAllCasosNegocio from "../../../services/AbmCasoNegocio/getAllCasosNegocio";

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
  const [newHorasCliente, setNewHorasCliente] = useState<string>("");

  const [newCN, setNewCN] = useState<string>("");

  const [dataCN, setDataCN ] = useState<{nombre:string, id: number}[]>([]);

  const handleClose = () => {
    setOpen(false);
  };

  async function handleClickFinish() {
    handleClose();
    editProyecto(proyecto);
  }

  const proyectsToDataCN = async () => {
    setDataCN(await getAllCasosNegocio());
  }
  useEffect(() => {
    proyectsToDataCN();

  }, [])

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
            value={proyecto.nombre}
            type="text"
            fullWidth
            variant="outlined"
            onChange={(e) => setProyecto({ ...proyecto, nombre: e.target.value })}
          />
          <TextField
            name="descripcion"
            margin="dense"
            label="Descripcion"
            value={proyecto.descripcion}
            type="text"
            fullWidth
            variant="outlined"
            onChange={(e) => setProyecto({ ...proyecto, descripcion: e.target.value })}
            />
            <TextField
            select
            name="newEstado"
            margin="dense"
            label="Estado"
            value={proyecto.estado}
            type="text"
            fullWidth
            variant="outlined"
            //onChange={(e) => setNewEstado(e.target.value)}
            onChange={(e) => setProyecto({ ...proyecto, estado: e.target.value })}
            >
              <MenuItem value={"ACTIVO"}>ACTIVO</MenuItem>
              <MenuItem value={"DESACTIVO"}>DESACTIVO</MenuItem>
            </TextField>
          
          <TextField
            name="newHorasCliente"
            margin="dense"
            label="Horas acordadas con el Cliente"
            value={proyecto.horasCliente}
            type="number"
            fullWidth
            variant="outlined"
            //onChange={(e) => setNewHorasCliente(e.target.value)}
            onChange={(e) => setProyecto({ ...proyecto, horasCliente: e.target.value })}
          />
           <TextField
          id="newCN"
          select
          margin="dense"
          label="Caso de Negocio"
          name="Caso de Negocio"
          fullWidth
          value={proyecto.idCasoNegocio}
          variant="outlined"
          onChange={(e) => setProyecto({...proyecto, idCasoNegocio: e.target.value})}
          >
            {dataCN.map((option: any) => (
              <MenuItem key={option.id} value={option.id}>
                {`${option.nombre}`}
              </MenuItem>
            ))}
          </TextField>
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
