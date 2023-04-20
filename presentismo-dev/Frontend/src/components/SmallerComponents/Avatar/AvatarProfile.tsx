import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import { useOpenCloseMenu } from '../../../hooks/OpenCloseMenu/useOpenCloseMenu';
import { useContext, useState } from 'react';
import Context from '../../../hooks/UseContext/Solicitudes';
import {useNavigate} from 'react-router-dom'
import { environment } from '../../../enviroment/enviroment';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react';
import { ButtonPrimary } from '../Buttons/Primary/ButtonPrimary';

interface textAvatar {
    text: string | null;
}

const useStyles = makeStyles({
    avatar: {
        backgroundColor: '#FFFF',
        border: '2.5px solid #007DC4',
        color: '#F6921E',
    },
    titulo: {
        backgroundColor: '#007DC4',
        color: '#FFFF',
        fontSize: '100%',
        textAlign: 'center',
        fontFamily: '"Montserrat", sans-serif',

    },
    menu: {
        marginTop: '2.5rem',
    }
});

export const AvatarProfile = ({ text}: textAvatar) => {

    const classes = useStyles();
    const { open, anchorEl, handleClick, handleClose } = useOpenCloseMenu();
    const solicitudes=useContext(Context);
    const navigate =useNavigate();
    const [abrirPop, setAbrirPop] = useState(false);
    const [openPop, setOpenPop] = React.useState(abrirPop);
    const close = () => {
        localStorage.clear();
        sessionStorage.clear();
        solicitudes.solicitudes=0;
        navigate(environment.LOGIN);
        window.location.replace('');
    }
    const handleClosePop = () => {
        setOpenPop(false);
        setAbrirPop(false);
    };
    const HandleClickOpen=()=>{
        setOpenPop(true);
        setAbrirPop(true);
    }
    const lider = 'LiderX';
    const rol = 'rol';
    const legajo = 123;
    const nombre = localStorage.getItem("nombre");
    return (
        <>
            <Button aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
                <Avatar
                    className={classes.avatar}
                >
                    {text}
                </Avatar>
            </Button>
            <Menu
                id="fade-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
                className={classes.menu}
            >
                <MenuItem onClick={HandleClickOpen}>Información personal</MenuItem>
                <MenuItem onClick={close}>Cerrar Sesión</MenuItem>
            </Menu>
            <Dialog onClose={handleClosePop} open={openPop} aria-labelledby="customized-dialog-title" maxWidth='xl'>
            <div style={{marginBottom:'7px'}}>
            <div className={classes.titulo}>
                <DialogTitle id="customized-dialog-title">
                    Información personal
                </DialogTitle>
            </div>
                <DialogContent dividers>
                    <div style={{display: 'flex', alignItems: 'end'}}>
                        <div>Nombre: {nombre}</div>
                        <div>Legajo: {legajo}</div>
                        <div>Rol: {rol}</div>
                        <div>Lider: {lider}</div>
                    </div>
                </DialogContent>
                <div style={{textAlign:'center'}}>
                <ButtonPrimary text={'Cerrar'} disabled={false} onClick={handleClosePop}></ButtonPrimary>    
                </div>
            </div>
            </Dialog>
        </>
    )
}
