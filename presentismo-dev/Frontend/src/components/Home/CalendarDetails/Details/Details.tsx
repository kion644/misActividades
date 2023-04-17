import { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import { Skeleton } from "@material-ui/lab";
import { environment } from "../../../../enviroment/enviroment";
import { useNavigate } from "react-router-dom";
import RegistroDeHoras from "../../../../services/RegistroDeHoras/registroDeHoras";
import PuedoIniciar from "../../../../services/PuedoIniciar/puedoIniciar";
import { AccordionDetail } from "../../../SmallerComponents/Accordions/AccordionDetail";
import { AccordionUpdate } from "../../../SmallerComponents/Accordions/AccordionUpdate";


const useStyles = makeStyles({
    card: {
        width: '95%',
        marginTop: '4%',
        marginLeft: '3%',
        marginButton: '10%',
        minWidth: '600px',
        minHeight: '650px',

    },
    skeleton: {
        width: '600px',
        height: '650px',
        marginTop: '5%',
        marginRight: '5%',
        marginLeft: '5%',

    },
    cardHeader: {
        backgroundColor: '#007DC4',
        color: '#FFFF',
        fontSize: '100%',
        textAlign: 'center',
        fontFamily: '"Montserrat", sans-serif',
        minWidth: '400px',
    },
    date: {
        color: '#7D7D7D',
        fontSize: '88px',
        padding: '1rem',
    }
});
interface props {
    nexo: boolean;
    setNexo: (value: boolean) => void;
    xfecha: string;
    setXfecha: (value: string) => void;
}
export const Details = ({ nexo, setNexo, xfecha, setXfecha }: props) => {
    const fecha = (fecha: any) => {
        const d = new Date(fecha);

        return (d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2))
    }
    const classes = useStyles();

    const [registroHora, setRegistroHora] = useState<any>(null);

    const [isLoading, setLoading] = useState(true);

    const navegate = useNavigate();

    useEffect(() => {
        async function loadDetails() {
            try {
                await new Promise(resolve => setTimeout(resolve, 500));
                const puedo: any = await PuedoIniciar()
                if (localStorage.getItem('user') == undefined) return
                const response: any = await RegistroDeHoras(fecha(puedo.data == null ? new Date().toString() : puedo.data))
                if (response.status === 200) {
                    setRegistroHora(response.data);
                    setLoading(false);
                } 
                else if (puedo.status === 403) {
                    localStorage.clear();
                    sessionStorage.clear();
                    navegate(environment.LOGIN);
                    window.location.reload();
                    window.location.replace('');
                } 
                else {
                    setRegistroHora({});
                }
            } catch (error) {

            }

        }
        loadDetails();
    }, [nexo]);

    return (
        <div >
            {isLoading ? (
                <div className={classes.skeleton}>

                    <Skeleton variant="text" />
                    <Skeleton variant="rect" />
                    <Skeleton variant="rect" />
                    <Skeleton variant="rect" />
                    <Skeleton variant="rect" />
                    <Skeleton variant="rect" />
                    <Skeleton variant="rect" />
                    <Skeleton variant="rect" />
                    <Skeleton variant="rect" />
                    <Skeleton variant="rect" />
                    <Skeleton variant="rect" />
                    <Skeleton variant="rect" />
                    <Skeleton variant="rect" />
                    <Skeleton variant="rect" />
                    <Skeleton variant="rect" />
                    <Skeleton variant="rect" />
                    <Skeleton variant="rect" />
                    <Skeleton variant="rect" />
                    <Skeleton variant="rect" />
                    <Skeleton variant="rect" />
                    <Skeleton variant="rect" />
                    <Skeleton variant="rect" />
                    <Skeleton variant="rect" />
                    <Skeleton variant="rect" />
                    <Skeleton variant="rect" />
                    <Skeleton variant="rect" />
                    <Skeleton variant="rect" />
                    <Skeleton variant="rect" />
                    <Skeleton variant="rect" />
                    <Skeleton variant="rect" />
                    <Skeleton variant="rect" />
                    <Skeleton variant="rect" />
                    <Skeleton variant="rect" />

                </div>
            ) : (registroHora &&
                <Card className={classes.card}>
                    <CardHeader
                        className={classes.cardHeader}
                        disableTypography
                        title='Detalles'
                    />
                    <AccordionUpdate
                        nexo={nexo}
                        setNexo={setNexo}
                    ></AccordionUpdate>
                    {
                        registroHora.data.map((a: any) =>

                            <div>

                                <AccordionDetail
                                    key={a.idRegistro}
                                    id={a.idRegistro}
                                    inicio={a.begin}
                                    fin={a.end}
                                    lugarTrabajo={a.lugarTrabajo}
                                    tipoHora={a.tipoHora}
                                    estado={a.estadoRegistro}
                                    clienteText={a.proyectoText}
                                    idCliente={a.idCliente}
                                    descripcion={a.description}
                                    horas={a.horasRango}
                                    estadoGeneral={a.estadoGeneral}
                                    nexo={nexo}
                                    setNexo={setNexo}
                                    setXFecha={setXfecha}
                                />

                            </div>

                        )
                    }
                </Card>)
            }
        </div>
    )
}

