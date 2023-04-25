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
import { Dialog } from '@material-ui/core';
import React from 'react';
import { ButtonPrimary } from '../Buttons/Primary/ButtonPrimary';
import { AvatarInfoDeploy } from './AvatarInfoDeploy';

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
                <AvatarInfoDeploy></AvatarInfoDeploy>
                <div style={{textAlign:'center',marginBottom:'7px'}}>
                <ButtonPrimary text={'Cerrar'} disabled={false} onClick={handleClosePop}></ButtonPrimary>    
                </div>
            </Dialog>
            
        </>
    )
}
