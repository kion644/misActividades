import { Dialog, DialogTitle, Typography, IconButton, DialogContent, TextField, DialogActions } from "@material-ui/core";
import { MenuItem } from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";
import { useEffect , useState } from "react";
import getAllMonedas from "../../../services/AbmMoneda/getAllMonedas";
import DialogStyles from "../../../styles/Dialog/DialogStyles"
import { GroupButtonFinished } from "../../SmallerComponents/Buttons/Group/GroupButtonFinished";


export const DialogEditCasoNegocio = ({
    open,
    casoNegocio,
    setOpen,
    setCasoNegocio,
    editCasoNegocio
}: any) => {
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
      
    }, []);

    useEffect(() => {
        cnToDataMoneda();
    }, [])

    const handleClose = () => {
        setOpen(false);
    }

    const handleChange = (e: any) =>{
        const {name, value} = e.target;
        setCasoNegocio({
            ...casoNegocio,
            [name]: value,
        });
    }

    const handleDisable = (): boolean => {
        if(casoNegocio.nombre){
            return false;
        }
        else{
            return true;
        }
    }

    async function enviarCasoNegocioEditado(){
        handleClose();
        editCasoNegocio(casoNegocio, newMoneda);
    }
    return(<>

      <Dialog open={open} aria-labelledby="customized-dialog-title">
        <div className={classes.titulo}>
          <DialogTitle disableTypography>
            <Typography variant="h6">Editar Caso de Negocio</Typography>
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
            placeholder={casoNegocio.nombre}
            value={casoNegocio.nombre}
            type="text"
            fullWidth
            variant="outlined"
            onChange={handleChange}
            required
          />
          <TextField
          id="newMoneda"
          select
          margin="dense"
          label="Moneda"
          name="Moneda"
          fullWidth
          value={casoNegocio.idMoneda}
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
            handleClickFinish={enviarCasoNegocioEditado}
          ></GroupButtonFinished>
        </DialogActions>
      </Dialog>
    
    </>)
}