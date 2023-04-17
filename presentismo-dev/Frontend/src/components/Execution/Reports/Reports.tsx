import {
  AppBar,
  Box,
  Grid,
  makeStyles,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import { Theme } from "@mui/material";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { environment } from "../../../enviroment/enviroment";
import { Facturacion } from "./Facturacion/Facturacion";
import { Personas } from "./Personas/Personas";


const useStyles = makeStyles((theme: Theme) => ({
  page: {
    height: "80vh",
  },
  botones: {
    height: "250px",
  },
  modal: {
    bgcolor: "background.paper",
    border: "2px solid #000",
  },
  icon: {
    color: "#007DC4",

    "&:hover": {
      cursor: "pointer",
    },
  },
  button: {
    backgroundColor: "#007DC4",
    margin: "10px",
    color: "#FFF",
    "&:hover": {
      backgroundColor: "#F6921E",
    },
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const Reports = () => {
  const [value, setValue] = useState(0);
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      {localStorage.getItem("user") != undefined ? (
        <Grid container>
          <Grid item className={classes.root}>
            <AppBar position="static">
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="simple tabs example"
              >
                <Tab label="Facturación" {...a11yProps(0)} />
                <Tab label="Personas" {...a11yProps(1)} />
              </Tabs>
            </AppBar>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <TabPanel value={value} index={0}>
                <Facturacion></Facturacion>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Personas></Personas>
              </TabPanel>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Navigate to={environment.LOGIN} replace={true}></Navigate>
      )}
    </>
  );
};
