
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
import DialogStyles from "../../../styles/Dialog/DialogStyles";
import { GroupButtonFinished } from "../../SmallerComponents/Buttons/Group/GroupButtonFinished";


export const DialogEditHoliday = ({
  open,
  feriado,
  paises,
  setOpen,
  setFeriado,
  editFeriado,
}: any) => {
  const classes = DialogStyles();

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFeriado({
      ...feriado,
      [name]: value,
    });
  };

  const handleDateChange = (date: Date | null) => {
    if (date === null) {
      setFeriado({
        ...feriado,
        fecha: new Date(),
      });
    } else {
      setFeriado({
        ...feriado,
        fecha: fechaHora(date),
      });
    }
  };

  const handleDisable = (): boolean => {
    if (feriado.descripcion) {
      return false;
    }

    return true;
  };

  async function enviarFeriadoEditado() {
    handleClose();
    editFeriado(feriado);
  }

  return (
    <>
      <Dialog open={open} aria-labelledby="customized-dialog-title">
        <div className={classes.titulo}>
          <DialogTitle disableTypography>
            <Typography variant="h6">Editar Feriado</Typography>
            <IconButton className={classes.closeButton} onClick={handleClose}>
              <GridCloseIcon />
            </IconButton>
          </DialogTitle>
        </div>
        <DialogContent dividers>
          <TextField
            name="descripcion"
            margin="dense"
            label="Nombre"
            placeholder={feriado.descripcion}
            value={feriado.descripcion}
            type="text"
            fullWidth
            variant="outlined"
            onChange={handleChange}
            required
          />
        </DialogContent>
        <div className={classes.content}>
          <DialogContent>
            <TextField
              name="pais"
              margin="dense"
              value={feriado.idPais}
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
                value={feriado.fecha}
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
            handleClickFinish={enviarFeriadoEditado}
          ></GroupButtonFinished>
        </DialogActions>
      </Dialog>
    </>
  );
};
