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
    disable:boolean;
}

export default function DateRangePicker({propDate,setDate,title,maxDate,disable}:props) {

  const handleDateChange = (date: Date | null) => {
      if (date === null){
          setDate(new Date())
      }else{
        setDate(date)
      }
   
  };

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
          minDate={new Date()}
          maxDate={maxDate}
          onChange={handleDateChange}
          autoOk={true}
          disabled={disable}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
    </>
  );
}

