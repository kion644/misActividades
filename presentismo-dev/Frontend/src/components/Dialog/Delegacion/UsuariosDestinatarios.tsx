import React, { useEffect, useState } from 'react'
import { Checkbox, createStyles, Grid, List, ListItem, ListItemIcon, ListItemText, makeStyles, Theme } from '@material-ui/core';
import GetAllUsuarios from '../../../services/Usuarios/GetAllUsuarios';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root4: {
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      height:'50px'
    },
  })
);

export default function UsuariosDestinatarios({delegacion, checked, setChecked}: any){
    const classes = useStyles();
    const [users, setUsers] = useState<Number[]>([]);

    useEffect(() =>{
        let id = delegacion && delegacion.id ? delegacion.id : 0;
        GetAllUsuarios(id).then((result) => {
          setUsers(result);
        })
        return () => {};  
      },[]);
      
    const handleToggle = (value: any) => () => {
        const currentIndex = checked.indexOf(value.id);
        const newChecked = [...checked];
    
        if (currentIndex === -1) {
          newChecked.push(value.id);
        } else {
          newChecked.splice(currentIndex, 1);
        }
    
        setChecked(newChecked);
    };

    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center"  >
            <List >
            {users.map((value: any) => {
                return (
                    <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>
                        <ListItemIcon>
                        <Checkbox
                            edge="start"
                            checked={checked.indexOf(value.id) !== -1}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': value.username }}
                        />
                        </ListItemIcon>
                        <ListItemText id={value.username} primary={`${value.apellido}, ${value.nombre}`} />
                    </ListItem>
                );
            })}
            </List>
        </Grid>
    )
}
