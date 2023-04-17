import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({

    container: {
      
      width: '100%',
      display: 'flex',
      alignItems: 'left',
    },
  }),
);
interface prop {
  id: number,
  setId: (value: number) => void,
  setText: (value: string) => void,
  text: String,
  subText: String,
  data: any,
  isCompleted: boolean,
  defaultValue: any
}
export const SelectDetailsCalendar = ({ id, setId, text, subText, data, setText, isCompleted, defaultValue }: prop) => {
  const classes = useStyles();



  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    setId(+event.target.value);
    data.map((item: any) => {
      if (item.id == event.target.value) {
    
        setId(item.id)
        setText(item.nombre);

      }
    });

  };
  useEffect(() => {


   
   try {
    data.map((item: any) => {
      if (item.id == id) {
      
        setText(item.nombre);
        setId(item.id);
      }
    });

   } catch (error) {
  
   }
   
  
    // if (id == 0) {
    //   setText(data[0].nombre);
    //   setId(data[0].id);
    //   console.log("FACE TEXT: " + data[0].nombre)
    //   console.log("FACE TEXT: " + data[0].id)
    // }
    
 
  }, []);

 


  const opciones = () => {

    return (
      data.map((a: any) =>
        <option
          key={a.id}
          value={a.id}
        >{a.nombre}</option>

      )

    )

  }
  return (
    <div className={classes.container}>
      <FormControl className={classes.container}>
        <InputLabel htmlFor="age-native-helper" >{text}</InputLabel>
        <NativeSelect
          defaultValue={defaultValue}
          onChange={handleChange}
          required={true}
          error={id != 0 ? false : true}
        > <option
        key={0}
        value={0}
      ></option>
          {opciones()}
        </NativeSelect>
        <FormHelperText>{subText + "*"}</FormHelperText>
      </FormControl>

    </div>
  );
}
