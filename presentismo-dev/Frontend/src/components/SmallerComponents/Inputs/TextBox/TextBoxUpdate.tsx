import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';


interface prop{
    text:string,
    setText:(value:string)=>void,
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({

        root: {
            width: '70%',
        },
    }),
    );


export const TextBoxUpdate = ({text,setText}:prop) => {

    const classes= useStyles();
    const [error,setError]= useState(false)
    const handleInputChange=(texto:any)=>{
        setText(texto.target.value);
     
    }

 
    return (
     
        <TextField 
        className={classes.root}
        id="standard-basic" 
        label="Justificación" 
        value={text}
        required
        onChange={handleInputChange}
        error={error}
        />
            
           
    )
}