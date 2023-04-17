import { Dialog, DialogTitle, Typography, IconButton, DialogContent, TextField, DialogActions } from "@material-ui/core";
import { GridCloseIcon } from "@mui/x-data-grid";
import { useEffect } from "react";
import DialogStyles from "../../../styles/Dialog/DialogStyles"
import { GroupButtonFinished } from "../../SmallerComponents/Buttons/Group/GroupButtonFinished";


export const DialogEditMoneda = ({
    open,
    moneda,
    setOpen,
    setMoneda,
    editMoneda
}: any) => {
    const classes = DialogStyles();


    const handleClose = () => {
        setOpen(false);
    }

    const handleChange = (e: any) =>{
        const {name, value} = e.target;
        setMoneda({
            ...moneda,
            [name]: value,
        });
    }

    const handleDisable = (): boolean => {
        if(moneda.descripcion){
            return false;
        }
        if(moneda.abreviatura){
            return false;
        }
        else{
            return true;
        }
    }

    async function enviarMonedaEditada(){
        handleClose();
        editMoneda(moneda);
    }
    return(<>

      <Dialog open={open} aria-labelledby="customized-dialog-title">
        <div className={classes.titulo}>
          <DialogTitle disableTypography>
            <Typography variant="h6">Editar Moneda</Typography>
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
            placeholder={moneda.descripcion}
            value={moneda.descripcion}
            type="text"
            fullWidth
            variant="outlined"
            onChange={handleChange}
            required
          />
        </DialogContent>
        <DialogContent>
          <TextField
            name="abreviatura"
            margin="dense"
            label="Abreviatura"
            placeholder={moneda.abreviatura}
            value={moneda.abreviatura}
            type="text"
            fullWidth
            variant="outlined"
            onChange={handleChange}
            required
          />
        </DialogContent>
       

        <DialogActions>
          <GroupButtonFinished
            cancelDisable={false}
            finishDisable={handleDisable()}
            handleClickCancel={handleClose}
            handleClickFinish={enviarMonedaEditada}
          ></GroupButtonFinished>
        </DialogActions>
      </Dialog>
    
    </>)
}