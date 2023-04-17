import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { Grid } from '@material-ui/core';
import { roles } from '../../enviroment/roles';
import ApprovalTable from '../Tables/CambiosInicio/ApprovalTable';
import FinishedTable from '../Tables/CambiosInicio/Pendientes';
import AceptedTable from '../Tables/CambiosInicio/FinishedTable';



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
    backgroundColor: theme.palette.background.paper
   
  },
  barra: {
    backgroundColor: "#007DC4"
  }
}));


export default function SimpleTabs() {
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
                <Tab label="Mis solicitudes" {...a11yProps(0)} />
   
              </Tabs>
            </AppBar>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <TabPanel value={value} index={0}>
                <ApprovalTable></ApprovalTable>
              </TabPanel>
          
            </Grid>
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Grid container>
          <Grid item className={classes.root}>
            <AppBar position="static">
              <Tabs className={classes.barra} value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab label="Mis solicitudes " {...a11yProps(0)} />
                <Tab label="Solicitudes Pendientes" {...a11yProps(1)} />
                <Tab label="Solicitudes ejecutadas" {...a11yProps(2)} />

              </Tabs>
            </AppBar>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>

              <TabPanel value={value} index={0}>
                <ApprovalTable></ApprovalTable>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <FinishedTable></FinishedTable>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <AceptedTable></AceptedTable>
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