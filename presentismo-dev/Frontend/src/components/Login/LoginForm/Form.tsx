import { makeStyles } from '@material-ui/core';
import { FormDetails } from './FormDetails/FormDetails';

const useStyles = makeStyles({
    //el fondo blanco
    root: {
        backgroundColor: "#FFFFFF",
        borderRadius: '15px',
        padding: '1.5rem',
        width: '300px',
        height: '300px',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },

});
interface prop {

    setOpen: (value: boolean) => void;
    setOpenError: (value: boolean) => void;
    setMessage: (value: string) => void;
    setAlert: (value: {
        type: string | null;
        request: string | null;
        message: string | null;
        open: boolean;
    }) => void;

}


export const Form = ({ setAlert, setOpen, setOpenError, setMessage }: prop) => {

    const classes = useStyles();

    return (
        <div className={classes.root} >

            {<FormDetails setAlert={setAlert} setOpen={setOpen} setOpenError={setOpenError} setMessage={setMessage} />}
        </div>
    )
}
