import { useState } from "react";


import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { GridCloseIcon } from "@mui/x-data-grid";


import { Dialog, IconButton, TextField, Typography } from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { fechaHora } from "../../../function/fechaHora";
import { Feriados } from "../../../models/Feriados";
import DialogStyles from "../../../styles/Dialog/DialogStyles";
import { GroupButtonFinished } from "../../SmallerComponents/Buttons/Group/GroupButtonFinished";

const initialState = {
  nombre: "",
  fecha: fechaHora(new Date()),
  idPais: 1,
};

export const DialogNewHoliday = ({
  open,
  setOpen,
  addFeriado,
  paises,
}: any) => {

  const [dataForm, setDataForm] = useState(initialState);
  
  const classes = DialogStyles();

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const handleDateChange = (date: Date | null) => {
    setDataForm({
      ...dataForm,
      fecha: fechaHora(date),
    });
  };
  const handleDisable = (): boolean => {
    if (dataForm.nombre) {
      return false;
    }

    return true;
  };

  async function handleClickFinish() {
    let feriado;

    feriado = new Feriados(dataForm.fecha, dataForm.idPais, dataForm.nombre);
    handleClose();
    addFeriado(feriado);
    setDataForm(initialState);
  }

  return (
    <>
      <Dialog open={open}>
        <div className={classes.titulo}>
          <DialogTitle disableTypography>
            <Typography variant="h6">Nuevo Feriado</Typography>
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
        </DialogContent>
        <div className={classes.content}>
          <DialogContent>
            <TextField
              name="pais"
              margin="dense"
              value={dataForm.idPais}
              select
              type="text"
              fullWidth
              variant="outlined"
              SelectProps={{
                native: true,
              }}
              onChange={handleChange}
              required
            >
              {paises.map((opcion: any) => (
                <option key={opcion.idPais} value={opcion.idPais}>
                  {opcion.nombrePais}
                </option>
              ))}
            </TextField>
          </DialogContent>
          <DialogContent>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                name="fecha"
                format="dd/MM/yyyy"
                margin="normal"
                autoOk
                value={dataForm.fecha}
                onChange={(date) => handleDateChange(date)}
              />
            </MuiPickersUtilsProvider>
          </DialogContent>
        </div>

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
