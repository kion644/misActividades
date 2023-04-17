
import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core';
interface prop {
       
    setDate : (value:Date) => void;
    title   : String;
    minDate : Date;

}
const useStyles = makeStyles({
  conteiner: {
     
      width: '90%',
      marginBottom:'4%'
  

  },
});

export default function CalendarTwoHasta({ setDate, title, minDate }: prop) {
  // The first commit of Material-UI
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    minDate,
  );
  const fecha = (fecha: any) => {
    const d = new Date(fecha);
   
    return (d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2))}

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date === null){
      setDate(new Date())
  }else{
    setDate(date)
  }
  };
 
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container className={classes.conteiner}>
        <KeyboardDatePicker
          autoOk
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label={title}
          value={selectedDate}
          minDate={minDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}