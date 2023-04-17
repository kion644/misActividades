import 'date-fns';
import { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
} from '@material-ui/pickers';

import { makeStyles } from '@material-ui/core';

interface data {
    inicio: Date;
    fin: Date;
    setInicio: (value:any)=> void;
    setOpenError: (value:any)=> void;
    setAlertText: (value:any)=> void;
    setIsOptionInvalid: (value:any)=> void;

}

const useStyles = makeStyles({


})


export const TimerPickerUpdate = ({ inicio, fin,setInicio, setOpenError, setAlertText, setIsOptionInvalid }: data) => {

    const classes = useStyles();
    const [inicioTemp, setInicioTemp] = useState(inicio);
    const handleDateChangeInicio = (date: Date | null) => {
       const now = new Date();
        try {
            if (date !== null) {
                if (date < inicio ) {
                    setIsOptionInvalid(false);
                    setInicioTemp(date);
                    setInicio(date);
                    
                } else {
                    setInicioTemp(date);
                    setIsOptionInvalid(true)
                    setOpenError(true);
                    setAlertText('El horario escogido está por delante de su inicio original')
                }
            }
        } catch {
            setInicioTemp(inicio);
            setInicio(inicio);
        }

    };


    const botones = () => {


        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                    margin="normal"
                    id="Inicio"
                    ampm={true}
                    label='Inicio'
                    value={inicioTemp}
                 
                    onChange={handleDateChangeInicio}
                    KeyboardButtonProps={{
                        'aria-label': 'change time',
                    }}
                />
            </MuiPickersUtilsProvider>
        )
    }

    return (

        <>{botones()}</>
    );
}