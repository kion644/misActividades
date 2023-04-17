import DateFnsUtils from "@date-io/date-fns";
import { Dialog, DialogTitle, Typography, IconButton, DialogContent, TextField, DialogActions } from "@material-ui/core";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import { MenuItem } from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";
import { useEffect, useState } from "react"
import { CasoNegocio } from "../../../models/CasoNegocio";
import getAllMonedas from "../../../services/AbmMoneda/getAllMonedas";
import DialogStyles from "../../../styles/Dialog/DialogStyles";
import { GroupButtonFinished } from "../../SmallerComponents/Buttons/Group/GroupButtonFinished";

const initialState = {
    nombre: "",
    idMoneda: 0
}
export const DialogNewCasoNegocio = ({
    open,
    setOpen,
    addCasoNegocio
}: any) => {

    const [dataForm, setDataForm] = useState(initialState);
    const classes = DialogStyles();
    const [dataMoneda, setDataMoneda] = useState<{
      descripcion: string,
      id: number
    }[]>([]);
    const [newMoneda, setNewMoneda] = useState<string>("");

    const cnToDataMoneda = async () => {
      setDataMoneda(await getAllMonedas());
    }

    useEffect(() => {
      cnToDataMoneda();
    }, []);
    const handleClose = () => {
        setOpen(false);
    }

    const handleChange = (e: any) =>{
        const {name, value} = e.target;
        setDataForm({...dataForm, [name]: value});
    };

    const handleDisable = (): boolean => {
        if(dataForm.nombre){
            return false;
        }
        else{
            return true;
        }
    }

    async function handleClickFinish(){
        let casoNegocio;

        casoNegocio = new CasoNegocio(dataForm.nombre, dataForm.idMoneda);
        handleClose();
        addCasoNegocio(casoNegocio.nombre, newMoneda);
        setDataForm(initialState);
    }

    return(
        <>
          <Dialog open={open}>
        <div className={classes.titulo}>
          <DialogTitle disableTypography>
            <Typography variant="h6">Nuevo Caso de Negocio</Typography>
            <IconButton className={classes.closeButton} onClick={handleClose}>
              <GridCloseIcon />
            </IconButton>
          </DialogTitle>
        </div>
        <DialogContent dividers>
          <TextField
            name="nombre"
            margin="dense"
            label="Nombre"
            value={dataForm.nombre}
            type="text"
            fullWidth
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
          id="newMoneda"
          select
          margin="dense"
          label="Moneda"
          name="Moneda"
          fullWidth
          value={newMoneda}
          variant="outlined"
          onChange={(event) => setNewMoneda(event.target.value)}
          >
            {dataMoneda.map((option: any) => (
              <MenuItem key={option.id} value={option.id}>
                {`${option.descripcion}`}
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
    )
}