import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({

    container: {
      width: '90%',
     marginTop:'0.5%',
     marginLeft:'1%'
    },
  }),
);
interface prop {

  setText: (value: string) => void,
  text: String,
  subText: String,
  data: any,
}
export const SelectSubditos = ({ text, subText, data, setText }: prop) => {
  
  const classes = useStyles();
  const [value, setValue] = useState<any>(localStorage.getItem("apellido"));

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
  
    data.map((item: any) => {
      let nombre: string = item.apellido + " " + item.nombre
      if (nombre == event.target.value) {
    
        setText(item.user);
        setValue(nombre);

      }
    });

   
  };

  useEffect(() => {



  }, []);


  const opciones = () => {

    return (
      data.map((a: any) =>
        <option
          key={a.user}
        >{a.apellido + " "}{a.nombre}</option>

      )

    )

  }

  return (
    <div className={classes.container}>
      <FormControl fullWidth={true} className={classes.container}>
        <InputLabel htmlFor="age-native-helper">{text}</InputLabel>
        <NativeSelect
          value={value}
          onChange={handleChange}

          required={true}
        >
          {opciones()}
        </NativeSelect>
        <FormHelperText>{subText}</FormHelperText>
      </FormControl>

    </div>
  );
}
