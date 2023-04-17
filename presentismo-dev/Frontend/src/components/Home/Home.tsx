
import { Grid, makeStyles, ThemeProvider } from '@material-ui/core';
import { useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { environment } from '../../enviroment/enviroment';
import React from 'react';
import theme from '../../theme/themeConfig';
import { CalendarDetails } from './CalendarDetails/CalendarDetails';
import {Body} from './Body/Body'

const useStyles = makeStyles({

    bodyDiv: {
        fontFamily: '"Montserrat", sans-serif',
        width: '100%',
        height: '100%',

    },
});

export const Home = () => {
    const classes = useStyles();
    const [nexo, setNexo] = useState(false);
    const [xfecha, setXfecha] = useState('');

    let timeoutId: any;

    // useEffect(()=>{

    //         const r = localStorage.getItem("301") || "comun";
    //         setRol(r);


    // },[]);


  

    useEffect(() =>{
        //Ejecuta la función scheduleUpdate cuando el componente se monta o actualiza
        scheduleUpdate();

        //Elimina el temporizador creado cuando el componente se desmonta
        return () =>{
            clearTimeout(timeoutId)
        }
    }, [])


    //Función que programa la actualización de página para dentro de 10 minutos
    const scheduleUpdate = () => {
        //Obtiene la hora actual en milisegundos
        const currentTime = new Date().getTime();
        //Calcula el momento en que se debe actualizar la página (10 minutos después de la hora actual)
        const updateTime = currentTime + 10 * 60 * 1000;

        //Programa la actualización de página para el momento calculado
         timeoutId = setTimeout(() =>{
            window.location.reload();
        }, updateTime - currentTime);
    }


    return (<>
        {localStorage.getItem('user') != undefined ? (

            <ThemeProvider theme={theme}>
                <Grid >
                    <Grid container className={classes.bodyDiv}>
                        <Grid item md={6}>
                            <Body
                                setNexo={setNexo}
                                nexo={nexo}
                                xfecha={xfecha}
                                setXfecha={setXfecha}
                            />
                        </Grid>
                        <Grid item md={6}>
                            <CalendarDetails
                                nexo={nexo}
                                setNexo={setNexo}
                                xfecha={xfecha}
                                setXfecha={setXfecha}
                            />
                        </Grid>
                    </Grid>

                </Grid>
            </ThemeProvider>

        ) : (
            <Navigate to={environment.LOGIN} replace={true}></Navigate>
        )}

    </>


    )
}
