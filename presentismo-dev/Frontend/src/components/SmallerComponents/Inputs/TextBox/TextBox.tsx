
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';

const useStyles = makeStyles({
    root: {
        width: '83%',
    

    }
})
interface prop {
    text: string,
    defaultValue: string, 
    setText: (value: string) => void,
    areCampsCompleted: () => boolean,
    label: string
}


export const TextBox = ({ text, setText, defaultValue, areCampsCompleted, label }: prop) => {

    const classes = useStyles();
    const [error, setError] = useState(false)
    const handleInputChange = (texto: any) => {
        setText(texto.target.value);

    }


    return (

        <TextField
            id="standard-basic"
            defaultValue={defaultValue}
            label={label}
            required
            placeholder={label}
            onChange={handleInputChange}
            error={defaultValue != "" ? false : true}
            className={classes.root}
        />


    )
}