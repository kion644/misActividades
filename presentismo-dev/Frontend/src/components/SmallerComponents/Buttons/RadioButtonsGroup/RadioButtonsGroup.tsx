import React, { useContext, useEffect } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import { Skeleton } from '@material-ui/lab';
import { environment } from '../../../../enviroment/enviroment';
import { useNavigate } from 'react-router-dom';
import { ValueContext } from '../../../../hooks/UseContext/ValueContext';
import LugarTrabajo from '../../../../services/LugarTrabajo/lugarTrabajo';
import { RadioButtonsActivated } from '../RadioButtons/RadioButtonsActivated';

interface props {

    value: string;

    setValue: (value: string) => void;

    disableRadio: boolean;

    cambie: boolean;

    setCambie: (value: boolean) => void;

    SetPrimary: (value: boolean) => void;

    valuePrimaryButton: boolean;

    title: string;

}

const useStyles = makeStyles({

    container: {

        width: '100%',

        display: 'flex',

        alignItems: 'left'

    },

    text: {

        color: '#B2B2B2',

        fontSize: '100%',

        width: '67%',

        justifyContent: 'flex-start ',

        marginLeft: '9.2%',

        padding: '3%'

    },

    radioGroup: {

        width: '80%',

        justifyContent: 'space-around',

        display: 'flex',

        flexDirection: 'row',

        alignItems: 'end',

        marginTop: '1rem',

        marginBottom: '1.75rem',

        marginLeft: '10%',

        marginRight: '10%',

        color: '#555559'

    },
});
// Texto de los botones

const INICIO = "Iniciar actividades";

const FINALIZAR = "Finalizar actividades";

const PAUSAR = "Pausar actividades";

const REANUDAR = "Reanudar actividades";

// Estados del dia

const INICIADO = "INICIADO";

const SIN_INICIAR = "SIN_INICIAR";

const PAUSADO = "PAUSADO";

const FINALIZADO = "FINALIZADO";

export const RadioButtonsGroup = ({ value, setValue, disableRadio, cambie, setCambie, SetPrimary, valuePrimaryButton, title }: props) => {

    const classes = useStyles();

    const { valuesRadio, setValuesRadio } = useContext(ValueContext);

    const [cargue, setCargue] = useState(false);

    const [data, setData] = useState<any>()

    const navegate = useNavigate();

    useEffect(() => {

        async function lugarTrabajo() {

            const response: any = await LugarTrabajo()

            if (response.status === 200) {

                if (title == 'Cliente/Proyecto') {

                    setData([{ id: "1", nombre: 'YPF/Testing' }, { id: "2", nombre: 'Banco Galicia/Testing' }, { id: "3", nombre: 'Banco Galicia/Producto Nuevo' }])

                } 
                else if (response.status === 403) {
                    localStorage.clear()
                    sessionStorage.clear();
                    navegate(environment.LOGIN);
                    window.location.replace('');
                } 
                else {

                    setData(response.data.data);

                }

                setCargue(true);

            }

        }

        lugarTrabajo();

    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        setValue((event.target as HTMLInputElement).value);

        setCambie(!cambie);

        SetPrimary(true);

        if (valuesRadio === true) {

            setValuesRadio(!valuesRadio);

        }

    };

    return (

        <div>

            {cargue ? (

                data &&

                <Grid container>

                    <FormControl className={classes.container} component="fieldset">

                        <Typography className={classes.text} variant="body1" >

                            {title}

                        </Typography>

                        <Grid item xs={12}>

                            <RadioGroup

                                className={classes.radioGroup}

                                aria-label={title}

                                name={title}

                                value={value}

                                onChange={handleChange}

                            >{cargue ? (

                                data.map((a: any) =>

                                    <RadioButtonsActivated

                                        key={a.id}

                                        value={a.nombre}

                                        disabled={!disableRadio}

                                    />

                                )

                            ) : (

                                <Skeleton className={classes.radioGroup} animation="wave" variant='rect' />

                            )}
                            </RadioGroup>

                        </Grid>

                    </FormControl>

                </Grid>

            ) : (

                <div>

                    <Skeleton />

                    <Skeleton animation={false} />

                    <Skeleton animation="wave" />

                    <Skeleton />

                    <Skeleton animation={false} />

                    <Skeleton animation="wave" />

                    <Skeleton />

                </div>

            )}

        </div>

    )

}

