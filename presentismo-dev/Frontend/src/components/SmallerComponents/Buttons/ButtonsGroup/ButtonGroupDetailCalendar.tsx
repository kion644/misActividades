import ButtonGroup from '@material-ui/core/ButtonGroup';
import { green } from '@material-ui/core/colors';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useState } from 'react';
import { ButtonDetails } from '../Details/ButtonDetails';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& > *': {
        margin: theme.spacing(1),
        marginLeft: theme.spacing(35)
      },

    },

    buttonStyleRestablecer: {
      display:'flex',
      backgroundColor: '#007DC4',
      color: '#FFFFFF',
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      fontFamily: '"Montserrat", sans-serif',
      '&:hover': {
        backgroundColor: '#F6921E'
      }
    },

    buttonStyleGuardar: {
      display:'flex',
      backgroundColor: '#007DC4',
      color: '#FFFFFF',
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      fontFamily: '"Montserrat", sans-serif',
      '&:hover': {
        backgroundColor: '#F6921E'
      }
    },
    buttonProgress: {
      color: green[500],
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },

  }),
);

interface prop{
  restablecer:() => void;
  guardar:() => void;
  areCampsCompleted: () => boolean;
}

export const ButtonGroupDetailCalendar = ({restablecer,guardar, areCampsCompleted}:prop) => {
  const classes = useStyles();


  
  return (
    <div className={classes.root}>
      <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">

        <ButtonDetails estilo={classes.buttonStyleGuardar} text={'Guardar'} disabled={areCampsCompleted()} onClick={() => guardar()} />
        
      </ButtonGroup>
    

    </div>
  );
}