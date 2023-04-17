import React, {useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 150,
      fontFamily:'"Montserrat", sans-serif',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },

    root: {
      fontFamily:'"Montserrat", sans-serif',
    }
  }),
);
interface prop{

}
export const SelectClients = () => {
  const classes = useStyles();
 // const [isLoadig, setIsLoadig] = useState(true);

  const handleChange = (event: React.ChangeEvent<{value: string }>) => {
    setId(+event.target.value)
  };
  const[data,setData]=useState([{id:1,nombre:'YPF/Testing'},{id:2,nombre:'Banco Galicia/Testing'},{id:3,nombre:'Banco Galicia/Producto Nuevo'}])
  const[id,setId]=useState<number>();

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
    <div className={classes.root}>

      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-helper">{'Cliente/Proyecto'}</InputLabel>
        <NativeSelect
          value={id}
          onChange={handleChange}
          required={true}
        > 
          {opciones()}         
        </NativeSelect>
        <FormHelperText>{'Cliente/Proyecto'}</FormHelperText>
      </FormControl>

    </div>
  );
}
