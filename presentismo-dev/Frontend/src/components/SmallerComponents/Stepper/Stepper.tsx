import { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { Button} from '@material-ui/core';



interface props {
    fase: number;
    setFase: (value: number) => void;
    steps: string[];
    disableButton: boolean;
    handleClic: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        button: {
            color: '#FFF',
            marginRight: theme.spacing(1),
            backgroundColor: '#007DC4',
            '&:hover': {
                backgroundColor: '#F6921E'
            }
        },
        instructions: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
    }),
);





export default function CustomizedSteppers({ fase, setFase, steps, disableButton, handleClic }: props) {
    const classes = useStyles();
    const pasos = steps;
    const [disableBotton, setDisableBotton] = useState(false);
    const [listo, setListo] = useState(true);
    const [textButton, setTexButton] = useState('Siguiente')
    function handleBack() {
        setFase(fase - 1);
        setTexButton('Siguiente');
        setDisableBotton(false)
    }

    function handleNext() {
        if (textButton === 'Finalizar') {
            handleClic();
        } else {
            if ((fase + 1) < steps.length - 1) {
                setFase(fase + 1)
            } else {
                setFase(steps.length - 1)
                setTexButton('Finalizar');

            }
        }

    }

    function listaParaEnviar() {
        

        return (disableBotton && listo);
    }
    return (<>
        <div className={classes.root}>
            <Stepper alternativeLabel activeStep={fase}>
                {pasos.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

        </div>
        <div>
            {/* <Typography className={classes.instructions}></Typography> */}
            <div>
                <Button disabled={fase === 0} onClick={handleBack} className={classes.button} >
                    Anterior
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                    disabled={disableButton}
                >
                    {textButton}
                </Button>
            </div>
        </div>
    </>
    );
}
