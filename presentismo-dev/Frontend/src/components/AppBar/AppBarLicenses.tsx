import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Grid } from '@material-ui/core';
import { roles } from '../../enviroment/roles';
import Solicitudes from '../Licenses/PedidoLicencia';
import Licencias from '../Licenses/PedidoLicencia';
import LicenciasActivas from '../Tables/Licenses/LicenciasActivas';
import LicenciasAsignadas from '../Tables/Licenses/LicenciasAsignadas';
import LicenciasEjecutadas from '../Tables/Licenses/LicenciasEjecutadas';
import LicenciasEjecutadasAtencion from '../Tables/Licenses/LicenciasEjecutadasAtencion';
import LicenciasPendientesAtencion from '../Tables/Licenses/LicenciasPendientesAtencion';
import LicenciasPendientesLider from '../Tables/Licenses/LicenciasPendientesLider';
import LicensesTable from '../Tables/Licenses/LicensesTable';





interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    
  },
  barra: {
    backgroundColor: "#007DC4",
    
  }
}));


export default function AppBarLicenses() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const renderScreen = () => {
    if (localStorage.getItem('301') === roles.ROLCOMUN) {
   
      return (
        <Grid container>
          <Grid item className={classes.root}>
            <AppBar position="static">
              <Tabs className={classes.barra} value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab label="Mis licencias " {...a11yProps(0)} />
                <Tab label="Nueva solicitud" {...a11yProps(1)} />
              </Tabs>
            </AppBar>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <TabPanel value={value} index={0}>
                <LicensesTable></LicensesTable>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Licencias></Licencias>
              </TabPanel>
            </Grid>
          </Grid>
        </Grid>
      );
    } else if (localStorage.getItem('301') === roles.ROLLIDER) {
      return (
        <Grid container>
          <Grid item className={classes.root}>
            <AppBar position="static">
              <Tabs className={classes.barra} value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab label="Mis licencias " {...a11yProps(0)} />
                <Tab label="Nueva licencia" {...a11yProps(1)} />
                <Tab label="Licencias pendientes" {...a11yProps(2)} />
                <Tab label="Licencias Activas" {...a11yProps(3)} />
                <Tab label="Histórico" {...a11yProps(4)} />
              </Tabs>
            </AppBar>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <TabPanel value={value} index={0}>
                <LicensesTable></LicensesTable>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Solicitudes></Solicitudes>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <LicenciasPendientesLider></LicenciasPendientesLider>
              </TabPanel>
              <TabPanel value={value} index={3}>
                <LicenciasActivas></LicenciasActivas>
              </TabPanel>
              <TabPanel value={value} index={4}>
                <LicenciasEjecutadas></LicenciasEjecutadas>
              </TabPanel>
            </Grid>
          </Grid>
        </Grid>
      );
    } else  if (localStorage.getItem('301') === roles.ROLATENCION) {
      return (
        <Grid container>
          <Grid item className={classes.root}>
            <AppBar position="static">
              <Tabs className={classes.barra} value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab label="Mis licencias " {...a11yProps(0)} />
                <Tab label="Nueva licencia" {...a11yProps(1)} />
                <Tab label="Licencias pendientes" {...a11yProps(2)} />
                 <Tab label="Licencias asignadas" {...a11yProps(3)} />
                 <Tab label="Histórico" {...a11yProps(4)} /> 
              </Tabs>
            </AppBar>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <TabPanel value={value} index={0}>
                <LicensesTable></LicensesTable>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Solicitudes></Solicitudes>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <LicenciasPendientesAtencion></LicenciasPendientesAtencion>
              </TabPanel>
              <TabPanel value={value} index={3}>
                <LicenciasAsignadas></LicenciasAsignadas>
              </TabPanel>
              <TabPanel value={value} index={4}>
                <LicenciasEjecutadasAtencion></LicenciasEjecutadasAtencion>
              </TabPanel>  
            </Grid>
          </Grid>
        </Grid>
      );
    }
  }

  return (
    <>
      {renderScreen()}
    </>
  );
}