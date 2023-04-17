import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { licencia } from '../../../models/Licencia';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({

    container: {
      width: '90%',
      marginTop: '0.5%',
      marginLeft: '1%'
    },
  }),
);
interface prop {

  
  data: licencia[],
  value:string|undefined;
  setValue:(value:string|undefined)=>void;
  disable:boolean;
   setLabel:(value:string)=>void;
   label:string;
}
export const SelectProyectosLicencia = ({  data,value,setValue,disable,setLabel,label }: prop) => {

  const classes = useStyles();


  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {

    // setText(event.target.value);
    setLabel(event.target.value);
    setValue(data.find(element => element.nombre==event.target.value)?.id.toString());
  };

  // useEffect(() => {
  //   try {
  //     setValue(data[0].nombre)
  //   } catch (error) {

  //   }


  // }, []);


  const opciones = () => {

    return (
      data.map((a: any) =>
        <option
          key={a.user}
        >{a.nombre}</option>

      )

    )

  }

  return (
    <div className={classes.container}>
      <FormControl fullWidth={true} className={classes.container}>
        <InputLabel htmlFor="age-native-helper">{}</InputLabel>
        <NativeSelect
          value={label}
          onChange={handleChange}
          disabled={disable}
          required={true}
        >
          {opciones()}
        </NativeSelect>
        <FormHelperText>{'Seleccione una licencia'}</FormHelperText>
      </FormControl>

    </div>
  );
}
