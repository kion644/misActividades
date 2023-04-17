import React, { useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { personaBitacora } from '../../../models/PersonaBitacora';
import { elementAcceptingRef } from '@mui/utils';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({

    container: {
      width: '100%',
      marginTop: '0.5%',
      marginLeft: '1%'
    },
  }),
);
interface prop {

  
  data: any[],
  setCombo:(value:string)=>void;
  disable:boolean;
  setLabel:(value:string)=>void;
  label:string;
}
export const SelectPersonaBitacora = ({data,setCombo,disable,setLabel,label}: prop) => {

  const classes = useStyles();


  useEffect(() => {

    //console.log(data);
    //console.log(label);


}, []);


  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {

    // setText(event.target.value);
    setLabel(event.target.value);
    //console.log(data.find(element => element.username))
    setCombo(data.find(element => element.username==event.target.value)?.username.toString());
  };

  // useEffect(() => {
  //   try {
  //     setValue(data[0].nombre)
  //   } catch (error) {

  //   }


  // }, []);


  const opciones = () => {


    // data.filter((a) => a.username != localStorage.getItem('user'));




    return (
          data.filter((a: personaBitacora) => a.username != localStorage.getItem('user')).map((a) => <option  key ={a.id} >{a.username}</option>)


    )

  }

  return (
    <div className={classes.container}>
      <FormControl fullWidth={true} className={classes.container}>
        <InputLabel htmlFor="age-native-helper">{'Asignación'}</InputLabel>
        <NativeSelect
          value={label}
          onChange={handleChange}
          disabled={disable}
          required={true}
        >
           <option ></option>
          {data.filter((a: personaBitacora) => a.username != localStorage.getItem('user')).map((a) => <option  key ={a.id} >{a.username}</option>)}
        </NativeSelect>
        <FormHelperText>{'Asigne una persona a la nueva observación'}</FormHelperText>
      </FormControl>

    </div>
  );
}
