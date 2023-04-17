import { makeStyles } from '@material-ui/core';
import   Typography   from '@material-ui/core/Typography';


const useStyles = makeStyles({ 
    text1: {
        
        color: '#007dc4',
        fontSize: '90%',
        marginLeft: '5%',
        marginTop : '2%',
        fontFamily:'"Montserrat", sans-serif'
    },

    fechaText: {
        color: '#007dc4',
        fontSize: '100%',
        fontFamily:'"Montserrat", sans-serif'
        
    },

    text2: { 
        color: '#555559',
        fontSize: '70%',
        marginLeft: '5%',
        marginBottom: '5%',
        marginRight: '10%',
        fontFamily:'"Montserrat", sans-serif'
        
    },
    conteinerDate: { 
        height: '20%',
        width: '40%',
        marginLeft : '185%',
        marginTop : '0%',
        fontFamily:'"Montserrat", sans-serif'
    },
});

export const WelcomeHome = () => {

    const classes = useStyles();

    return (
        <div>
            <div className={classes.conteinerDate}>
            <Typography 
                className={ classes.fechaText }
                variant="subtitle1" 
            >
             
            </Typography>
            </div>
            <Typography 
                className={ classes.text1 }
            
            >
              Buenos días Alexis Carreras,
            </Typography>
            <Typography 
                className={ classes.text2 }
                
            >
                Bienvenido nuevamente al portal de Presentismo
            </Typography> 
        </div>
    )
}
