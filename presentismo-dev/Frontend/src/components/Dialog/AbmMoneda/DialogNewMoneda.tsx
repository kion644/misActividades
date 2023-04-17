import DateFnsUtils from "@date-io/date-fns";
import { Dialog, DialogTitle, Typography, IconButton, DialogContent, TextField, DialogActions } from "@material-ui/core";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import { GridCloseIcon } from "@mui/x-data-grid";
import { useState } from "react"
import { CasoNegocio } from "../../../models/CasoNegocio";
import { Moneda } from "../../../models/Moneda";
import DialogStyles from "../../../styles/Dialog/DialogStyles";
import { GroupButtonFinished } from "../../SmallerComponents/Buttons/Group/GroupButtonFinished";

const initialState = {
    descripcion: "",
    abreviatura: ""
}
export const DialogNewMoneda = ({
    open,
    setOpen,
    addMoneda
}: any) => {

    const [dataForm, setDataForm] = useState(initialState);
    const classes = DialogStyles();

    const handleClose = () => {
        setOpen(false);
    }

    const handleChange = (e: any) =>{
        const {name, value} = e.target;
        setDataForm({...dataForm, [name]: value});
    };

    const handleDisable = (): boolean => {
        if(dataForm.descripcion){
            return false;
        }
        else{
            return true;
        }
    }

    async function handleClickFinish(){
        let moneda;

        moneda = new Moneda(dataForm.descripcion, dataForm.abreviatura);
        handleClose();
        addMoneda(moneda.descripcion, moneda.abreviatura);
        setDataForm(initialState);
    }

    return(
        <>
          <Dialog open={open}>
        <div className={classes.titulo}>
          <DialogTitle disableTypography>
            <Typography variant="h6">Nueva Moneda</Typography>
            <IconButton className={classes.closeButton} onClick={handleClose}>
              <GridCloseIcon />
            </IconButton>
          </DialogTitle>
        </div>
        <DialogContent dividers>
          <TextField
            name="descripcion"
            margin="dense"
            label="Descripcion"
            value={dataForm.descripcion}
            type="text"
            fullWidth
            variant="outlined"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogContent >
          <TextField
            name="abreviatura"
            margin="dense"
            label="Abreviatura"
            value={dataForm.abreviatura}
            type="text"
            fullWidth
            variant="outlined"
            onChange={handleChange}
          />
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