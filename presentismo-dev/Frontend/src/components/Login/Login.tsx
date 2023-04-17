import { makeStyles, Snackbar } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { environment } from "../../enviroment/enviroment";
import logo from "../SmallerComponents/Logos/cda_bg.jpg";
import Swal from "sweetalert2";
import { Form } from "./LoginForm/Form";



const useStyles = makeStyles({
    body: {
        display: ' grid',
        height: ' 100%',
        fill: "#007DAF"
    },
    cent: {
        maxWidth: '100%',
        maxHeight: '100vh',
        margin: 'auto',


    },
});

export const LoginUser = () => {

    const classes = useStyles();
    const [openError, setOpenError] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("")
    const navigate = useNavigate();
    const [alert, setAlert] = useState<{
        type: string | null;
        request: string | null;
        message: string | null;
        open: boolean;
    }>({
        type: null,
        request: null,
        message: null,
        open: false,
    });

    const handleClose = () => {

        setOpenError(false)
    };

    if (localStorage.getItem('user') != undefined) {
        navigate(environment.HOME);
        window.location.replace('');
    }

    return (
        <>

            <div className={classes.body}>

                <img src={logo} className={classes.cent} alt="fondo" width={"100%"} />

                <Form setAlert={setAlert} setOpen={setOpen} setOpenError={setOpenError} setMessage={setMessage} />
                <Snackbar
                    open={alert.type === "Error" && alert.open}
                    autoHideDuration={4000}
                    onClose={() => setAlert({ ...alert, open: false })}
                >
                    <Alert
                        severity="error"
                        onClose={() => {
                            setAlert({ ...alert, open: false });
                        }}
                    >
                        <AlertTitle>{alert.type}</AlertTitle>
                        <strong>{alert.message}</strong>
                    </Alert>
                </Snackbar>
                <Snackbar
                    open={alert.type === "Realizado" && alert.open}
                    autoHideDuration={4000}
                    onClose={() => setAlert({ ...alert, open: false })}
                >
                    <Alert
                        severity="success"
                        onClose={() => {
                            setAlert({ ...alert, open: false });
                        }}
                    >
                        <AlertTitle>{alert.type}</AlertTitle>
                        {alert.request} con exito:{" "}
                        <strong>{alert.message}</strong>
                    </Alert>
                </Snackbar>
            </div>




        </>


    )
}