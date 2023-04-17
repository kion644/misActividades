import { useState, useEffect } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';

interface props {
    time: any;
    setTime: (value: any) => void;
    loadign: boolean;
}

const useStyles = makeStyles({
    root: {
        width: '100%',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        flexFlow: 'colum wrap',
        paddingTop: '2%',
        paddingBottom: '0%'

    },

    counter: {
        color: '#007DC4',
        margin: 0,
        padding: '2%',
        textShadow: '1px 1px 3px #BEBEBE',
        fontFamily: '"Montserrat", sans-serif',
        textAlign: 'center'
    },

});

export const Watch = ({ time, setTime, loadign }: props) => {

    const classes = useStyles();


    const [isLoading, setLoading] = useState(loadign);


    useEffect(() => {

        if (isLoading === true) {
            setTime({ ms: 0, s: 0, m: time.minutes, h: time.hours });

        }
    }, [isLoading]);

    const horas = () => {
        if (isLoading) {
            return (
                <Typography variant='h1' gutterBottom>
                    00
                </Typography>
            )
        }
        else {

            return (
                <Typography variant='h1' gutterBottom>
                    {('0' + time.h).slice(-2)}
                </Typography>

            )
        }
    }

    const minutos = () => {
        if (isLoading) {
            return (
                <Typography variant='h1' gutterBottom>
                    00 :
                </Typography>
            )
        }
        else {

            return (
                <Typography variant='h1' gutterBottom>

                    {('0' + time.m).slice(-2)}
                </Typography>
            )
        }
    }

    return (
    <Grid container className={classes.root}>
        <section className={classes.root}>
            {loadign ? (
                <Skeleton animation="wave" />
            ) : (

                <div>
                    
                    <div className={classes.root}>

                        <div className={classes.counter}>

                            {horas()}

                        </div>
                        <div className={classes.counter}>

                            <Typography variant='h1' gutterBottom>
                                :
                            </Typography>

                        </div>

                        <div className={classes.counter}>

                            {minutos()}

                        </div>
                        <div className={classes.counter}>

                            <Typography variant='h1' gutterBottom>
                                :
                            </Typography>

                        </div>
                        <div className={classes.counter}>
                            <Typography variant="h1" gutterBottom>
                                {(time.s >= 10) ? time.s : "0" + time.s}
                            </Typography>


                        </div>

                    </div>

                </div>

            )
            }
        </section >
    </Grid>
    )
}
