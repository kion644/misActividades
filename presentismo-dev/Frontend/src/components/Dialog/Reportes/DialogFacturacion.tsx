import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    makeStyles,
    Select,
    Typography,
  } from "@material-ui/core";
  import { useState } from "react";
  import FileDownloadIcon from '@mui/icons-material/FileDownload';
  
  const useStyles = makeStyles({
      button: {
          backgroundColor: "#007DC4",
          margin: "10px",
          color: "#FFF",
          "&:hover": {
            backgroundColor: "#F6921E",
          },
        },
  });
  
  export const DialogFacturacion = () => {
      const classes = useStyles()
  
    const categorias = [
      {
        id: 1,
        nombre: "Líder",
      },
      {
        id: 2,
        nombre: "Proyecto",
      },
    ];
  
    const [datos, setDatos] = useState({
      select1: "",
      select2: "",
    });
  
    const lideres = [
      {
        id: 1,
        nombre: datos.select1 === "Líder" ? "Andrea" : "proyecto",
      },
      {
        id: 1,
        nombre: datos.select1 === "Líder" ? "Juan" : "proyecto2",
      },
    ];
  
    const handleChange = (e: any) => {
      const { name, value } = e.target;
      setDatos({
        ...datos,
        [name]: value,
      });
    };
  
    return (
      <>
        
          <Grid container justifyContent="center">
            <Box>
              <Typography variant="h6" component="h2">
                Crea un excel con la informacion de las personas en cada proyecto,
                lider, etc.
              </Typography>
              <Box sx={{ display: "flex" }}>
                <FormControl fullWidth variant="standard">
                  <InputLabel id="demo-controlled-open-select">Categoría</InputLabel>
                  <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    name="select1"
                    label="Categoría"
                    value={datos.select1}
                    onChange={handleChange}
                    autoWidth
                  >
                    {categorias.map((opcion: any) => (
                      <option key={opcion.id} value={opcion.nombre}>
                        {opcion.nombre}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth variant="standard">
                  <InputLabel id="demo-simple-select-label">Categoría</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    name="select2"
                    label="Categoría"
                    value={datos.select2}
                    
                    onChange={handleChange}
                    autoWidth
                  >
                    {lideres.map((opcion: any) => (
                      <option key={opcion.id} value={opcion.nombre}>
                        {opcion.nombre}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Box>
                <Button className={classes.button} variant="contained" endIcon={<FileDownloadIcon/>}>Exportar</Button>
            </Box>
          </Grid>
       
      </>
    );
  };
  