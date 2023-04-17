import { AppBar, Box, Grid, makeStyles, Tab, Tabs, Typography } from "@material-ui/core";
import { Theme } from "@mui/material";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { environment } from "../../enviroment/enviroment";
import { roles } from "../../enviroment/roles";
import { DelegacionesTable } from "../Tables/Delegations/DelegacionesTable";




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
  

export const AppBarDelegaciones = () => {

    const classes = useStyles();
    const [value, setValue] = useState(0);
  
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
      setValue(newValue);
    };

    const renderScreen = () => {
        if (localStorage.getItem('301') === roles.ROLCOMUN) {
          return (
            <Navigate to={environment.HOME} replace={true}></Navigate>
          );
        } else {
          return (
            <Grid container>
          <Grid item className={classes.root}>
            <AppBar position="static">
              <Tabs className={classes.barra} value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab label="Delegaciones " {...a11yProps(0)} />
              </Tabs>
            </AppBar>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <TabPanel value={value} index={0}>
                <DelegacionesTable></DelegacionesTable>
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
  )
}