import { GridCloseIcon } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
  WithStyles,
  
} from "@material-ui/core/styles";
import { Select, MenuItem} from "@mui/material";
import { Dialog, IconButton, TextField, Typography, FormControl, InputLabel, Box, InputBase, } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";

import { fechaHora } from "../../../function/fechaHora";
import { GroupButtonFinished } from "../../SmallerComponents/Buttons/Group/GroupButtonFinished";
import getAllClientes from "../../../services/Clientes/GetAllClientes";
import getAllLideres from "../../../services/Proyecto/GetComboLider";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import getAllCasosNegocio from "../../../services/AbmCasoNegocio/getAllCasosNegocio";

const initialState = {
  fecha: fechaHora(new Date()),
};

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
  onClose: () => void | any;
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




export const DialogNewProyecto = ({ open, setOpen, addProyecto,}: any) => {
  
  const classes = useStyles();

  const [newName, setNewName] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");
  const [newType, setNewType] = useState<string>("");
  const [newClient, setNewClient] = useState<string>("");
  const [newLider, setNewLider] = useState<string>("");
  const [newEstado, setNewEstado] = useState<string>("");
  const [newHorasCliente, setNewHorasCliente] = useState<string>("");
  const [newCN, setNewCN] = useState<string>("");


  const [dataclient, setDataClient] = useState<{
    descripcion: string,
    comboId: number,
  }[]>([]);
  const [dataEstado, setDataEstado] = useState<{
    descripcion: string,
    id: number,
  }[]>([]);
  const [dataCN, setDataCN] = useState<{
    nombre: string,
    id: number
  }[]>([]);

  const [newFechaInicio, setNewFechaInicio] = useState(initialState);
  const [newFechaFinEstimada, setNewFechaFinEstimada] = useState(initialState);

  const [datalider, setDataLider] = useState<{
    username: string,
    id: number,
  }[]>([]);


  const proyectsToDataCliente = async () => {
    setDataClient(await getAllClientes());
  };

  const proyectsToDataLider = async () => {
    setDataLider(await getAllLideres());
  };

  const proyectsToDataCN = async () => {
    setDataCN(await getAllCasosNegocio());
  }

  useEffect(() => {
    proyectsToDataCliente();
    proyectsToDataLider();
    proyectsToDataCN();
  }, []);


  
  const optionsClient = () => {

    return (
     dataclient.map((a: {comboId:number, descripcion: string}) =>
        
        <MenuItem value={a.descripcion}>{a.descripcion}</MenuItem>
        
      )
    )
  }

  const optionsLider = () => {

    return (
     datalider.map((a: {id:number, username: string}) =>
        
        <MenuItem value={a.username}>{a.username} </MenuItem>
      )
    )
}

  const handleClose = () => {
    setOpen(false);
    setNewName("");
    setNewDescription("");
    setNewType("");
    setNewClient("");
    setNewLider("");
    setNewEstado("");
    setNewCN("");
  };

  const handleDateChange = (date: Date | null) => {
    setNewFechaInicio({
      ...newFechaInicio,
      fecha: fechaHora(date),
    });
  };
  const handleDateEstimadaChange = (date: Date | null) => {
    
    setNewFechaFinEstimada({
      ...newFechaFinEstimada,
      fecha: fechaHora(date),
    });
  };

  const handleDisable = (): boolean => {
    if (newName) {
      return false;
    }
    if (newDescription) {
      return false;
    }
    if (newType) {
      return false;
    }
    if (newClient) {
      return false;
    }
    if (newLider) {
      return false;
    }
    if (newEstado) {
      return false;
    }
    return true;
  };

  async function handleClickFinish() {
    handleClose();
    addProyecto(newName, newDescription, newType, newClient, newLider,newEstado, newHorasCliente,newCN,newFechaInicio.fecha,newFechaFinEstimada.fecha);
    setNewName("");
    setNewDescription("");
    setNewType("");
    setNewEstado("");
  };

 

  return (
    <>
      <Dialog open={open} aria-labelledby="customized-dialog-title" onClose={handleClose}>
        <div className={classes.titulo}>
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Nuevo Proyecto
          </DialogTitle>
        </div>
        <DialogContent dividers>

          <TextField
            name="newName"
            margin="dense"
            label="Nombre"
            value={newName}
            type="text"
            fullWidth
            variant="outlined"
            onChange={(e) => setNewName(e.target.value)}
          />
          <TextField
            name="newDescription"
            margin="dense"
            label="Descripcion"
            value={newDescription}
            type="text"
            fullWidth
            variant="outlined"
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <TextField
            select
            name="newType"
            margin="dense"
            label="Tipo"
            value={newType}
            type="text"
            fullWidth
            variant="outlined"
            onChange={(e) => setNewType(e.target.value)}
          >
            <MenuItem value={"PRODUCTIVA"}>PRODUCTIVA</MenuItem>
            <MenuItem value={"LICENCIA"}>LICENCIA</MenuItem>
          </TextField>
          <TextField
            select
            name="newEstado"
            margin="dense"
            label="Estado"
            value={newEstado}
            type="text"
            fullWidth
            variant="outlined"
            onChange={(e) => setNewEstado(e.target.value)}
            >
              <MenuItem value={"ACTIVO"}>ACTIVO</MenuItem>
              <MenuItem value={"DESACTIVO"}>DESACTIVO</MenuItem>
            </TextField>
          
          <TextField
            name="newHorasCliente"
            margin="dense"
            label="Horas acordadas con el Cliente"
            value={newHorasCliente}
            type="number"
            fullWidth
            variant="outlined"
            onChange={(e) => setNewHorasCliente(e.target.value)}
          />
          
          <TextField
            id="newClient"
            select
            margin="dense"
            label="Cliente"
            name="cliente"
            fullWidth
            value={newClient}
            variant="outlined"
            onChange={(event)=>setNewClient(event.target.value)}
                >
                  {dataclient.map((option: any) => (
                  <MenuItem key={option.comboId} value={option.comboId}>
                    {`${option.descripcion}`}
                  </MenuItem>
                ))}
                
          </TextField>
          <TextField
            id="newLider"
            select
            margin="dense"
            label="Lider"
            name="Lider"
            fullWidth
            value={newLider}
            variant="outlined"
            onChange={(event)=>setNewLider(event.target.value)}
                >
                  {datalider.map((option: any) => (
                  <MenuItem key={option.id} value={option.id}>
                    {`${option.username}`}
                  </MenuItem>
                ))}
                
          </TextField>
          <TextField
          id="newCN"
          select
          margin="dense"
          label="Caso de Negocio"
          name="Caso de Negocio"
          fullWidth
          value={newCN}
          variant="outlined"
          onChange={(event) => setNewCN(event.target.value)}
          >
            {dataCN.map((option: any) => (
              <MenuItem key={option.id} value={option.id}>
                {`${option.nombre}`}
              </MenuItem>
            ))}
          </TextField>
            <MuiPickersUtilsProvider utils={DateFnsUtils} >
              <KeyboardDatePicker
              label= "Fecha de inicio"
                name="fecha"
                format="dd/MM/yyyy"
                margin="normal"
                autoOk
                value={newFechaInicio.fecha}
                onChange={(date) => handleDateChange(date)}
              />
            </MuiPickersUtilsProvider>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
              label= "Fecha de fin estimada"
                name="fecha"
                format="dd/MM/yyyy"
                margin="normal"
                autoOk
                value={newFechaFinEstimada.fecha}
                onChange={(date) => handleDateEstimadaChange(date)}
              />
            </MuiPickersUtilsProvider> 
          
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
