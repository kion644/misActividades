import {
  Box,
  Button,
  DialogActions,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import getAllProyects from "../../../services/Proyecto/GetAllProyects";
import DateRangePicker from "../../SmallerComponents/Buttons/Pickers/DateRangePicker";
import DateRangePickerHasta from "../../SmallerComponents/Buttons/Pickers/DateRangePickerHasta";
import ExportarExcel from "../../../services/Exportar/ExportarExcel";
import { soloFecha } from "../../../function/soloFecha";
import { GroupButtonFinished } from "../../SmallerComponents/Buttons/Group/GroupButtonFinished";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import DateFnsUtils from "@date-io/date-fns";
import { fechaHora } from "../../../function/fechaHora";

const initialState = {
  fecha: fechaHora(new Date()),
};

const useStyles = makeStyles({
    button: {
        backgroundColor: "#007DC4",
        margin: "10px",
        color: "#FFF",
        "&:hover": {
          backgroundColor: "#F6921E",
        },
      },
      input: {
          marginLeft: '5%'
      },
      clock: {
          marginLeft: '20%'
      },
});

export const DialogReporteDeHoras = ({addExport}: any) => {
    const classes = useStyles()
    
  const [dateDesde, setDateDesde] = useState(initialState);
  const [dateHasta, setDateHasta] = useState(initialState);
  const [dataProyecto, setDataProyecto] = useState<{
      nombre: string,
      id: number,
    }[]>([]);

  const [tipoDeHora, setTipoDeHora] = useState<string>("");
  const [tipoDeFecha, setTipoDeFecha] = useState<string>("");
  const [proyecto, setProyecto] = useState<any>(null);
  const [openSu, setOpenSu] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const getProyects = async () => {
    setDataProyecto(await getAllProyects());
  };

  useEffect(() => {
    getProyects();
  }, []);

  const [datos, setDatos] = useState({
    select1: "",
    select2: "",
    select3: "",
    select4: "",

  });
  const handleClose = () => {
    setProyecto("");
    setTipoDeFecha("");
    setTipoDeHora("");
  };

  const handleDateDesde = (date: Date | null) => {
    setDateDesde({
      ...dateDesde,
      fecha: fechaHora(date),
    });
  };
  const handleDateHasta = (date: Date | null) => {
    
    setDateHasta({
      ...dateHasta,
      fecha: fechaHora(date),
    });
  };
  async function handleClickFinish() {
    handleClose();
    addExport(proyecto, tipoDeFecha, tipoDeHora, dateDesde.fecha,dateHasta.fecha,);
    setProyecto("");
    setTipoDeFecha("");
    setTipoDeHora("");
  };

  return (
    <>
      
        <Grid container justifyContent="space-around">
          <Box>
            <Typography variant="h6" component="h2">
              Crea un excel con la informacion de las personas en cada proyecto,
              lider, etc.
            </Typography>
            <Box>
            <TextField
            id="proyecto"
            select
            margin="dense"
            label="Proyecto"
            name="proyecto"
            fullWidth
            value={proyecto}
            variant="outlined"
            onChange={(event)=>setProyecto(event.target.value)}
                >
                  {dataProyecto.map((option: any) => (
                     <MenuItem key={option.id} value={option.id}>
                     {`${option.nombre}`}
                   </MenuItem>
                  ))}
                
          </TextField>
              <TextField
            select
            name="newType"
            margin="dense"
            label="Tipo de hora"
            value={tipoDeHora}
            type="text"
            fullWidth
            variant="outlined"
            onChange={(e) => setTipoDeHora(e.target.value)}
          >
            <MenuItem value={"Horas reales"}>Horas reales</MenuItem>
            <MenuItem value={"Horas a facturar"}>Horas a facturar</MenuItem>
          </TextField>
          <TextField
            select
            name="newType"
            margin="dense"
            label="Tipo de fecha"
            value={tipoDeFecha}
            type="text"
            fullWidth
            variant="outlined"
            onChange={(e) => setTipoDeFecha(e.target.value)}
          >
            <MenuItem value={"A la fecha"}>A la fecha</MenuItem>
            <MenuItem value={"Estimado al mes"}>Estimado al mes</MenuItem>
          </TextField>
          <MuiPickersUtilsProvider utils={DateFnsUtils} >
              <KeyboardDatePicker
              label= "Desde"
                name="fechaDesde"
                format="dd/MM/yyyy"
                margin="normal"
                autoOk
                value={dateDesde.fecha}
                onChange={(date) => handleDateDesde(date)}
              />
            </MuiPickersUtilsProvider>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
              label= "Hasta"
                name="fechaHasta"
                format="dd/MM/yyyy"
                margin="normal"
                autoOk
                value={dateHasta.fecha}
                onChange={(date) => handleDateHasta(date)}
              />
            </MuiPickersUtilsProvider>
                {/* <FormControl>
                  <DateRangePicker
                    propDate={dateDesde}
                    setDate={setDateDesde}
                    title={"Desde"}
                    maxDate={sumarFecha(365)}
                    disable={cardTwo}
                  ></DateRangePicker>
                
              </FormControl>
              <FormControl className={classes.clock}>
                  <DateRangePickerHasta
                    propDate={dateHasta}
                    setDate={setDateHasta}
                    title={"Hasta"}
                    maxDate={sumarFecha(diasL - 1)}
                    minDate={dateDesde}
                    disable={cardTwo}
                  ></DateRangePickerHasta>
              </FormControl> */}
            </Box>
              <Button className={classes.button} 
              onClick={() => {
                handleClickFinish();
              }}variant="contained" endIcon={<FileDownloadIcon/>}>Exportar</Button>
          </Box>
        </Grid>
     
    </>
  );
};
