import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 155,
  },
  formControl2: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  formControl3: {
    margin: theme.spacing(1),
    minWidth: 250,
  },   
}));

export default function SelectUsuarioDelegar() {
  const classes = useStyles();

  return (
    <div>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="grouped-native-select">Usuario a delegar</InputLabel>
                    <Select native defaultValue="" id="grouped-native-select">
                        <option aria-label="None" value="" />
                        <optgroup label="Usuarios">
                        <option value={1}>Usuario 1</option>
                        <option value={2}>Usuario 2</option>
                        <option value={3}>Usuario 3</option>
                        <option value={4}>Usuario 4</option>
                        </optgroup>
                    </Select>
                </FormControl>
            </Grid> 
            <Grid item xs={12}>
                <FormControl className={classes.formControl2}>
                    <InputLabel htmlFor="grouped-native-select">Modulo a delegar</InputLabel>
                    <Select native defaultValue="" id="grouped-native-select">
                        <option aria-label="None" value="" />
                        <optgroup label="Modulos">
                        <option value={1}>Modulo 1</option>
                        <option value={2}>Modulo 2</option>
                        <option value={3}>Modulo 3</option>
                        <option value={4}>Modulo 4</option>
                        </optgroup>
                    </Select>
                </FormControl>
            </Grid> 
            <Grid item xs={12}>
                <FormControl className={classes.formControl3}>
                    <InputLabel htmlFor="grouped-native-select">Usuario de modulos a delegar</InputLabel>
                    <Select native defaultValue="" id="grouped-native-select">
                        <option aria-label="None" value="" />
                        <optgroup label="Usuarios">
                        <option value={1}>Usuario 1</option>
                        <option value={2}>Usuario 2</option>
                        <option value={3}>Usuario 3</option>
                        <option value={4}>Usuario 4</option>
                        </optgroup>
                    </Select>
                </FormControl>
            </Grid> 
           
        </Grid>    
    </div>
  );
}