import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

interface props{
    propDate:Date;
    setDate:(value:Date)=>void;
    title:String;
    maxDate:Date;
    minDate:Date;
    disable:boolean;
}

export default function DateRangePickerHasta({propDate,setDate,title,maxDate,minDate,disable}:props) {

  const handleDateChange = (date: Date | null) => {
      if (date === null){
          setDate(new Date())
      }else{
        setDate(date)
      }
   
  };
  const handleDateSelected = ()=>{
    
  }

  return (<>
    
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justifyContent="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label={title}
          value={propDate}
          minDate={minDate}
          maxDate={maxDate}
          autoOk={true}
          disabled={disable}
          onSelect={handleDateSelected}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
    </>
  );
}

