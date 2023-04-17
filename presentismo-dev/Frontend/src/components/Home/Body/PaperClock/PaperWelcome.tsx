import { makeStyles, Paper } from '@material-ui/core';
import { WelcomeHome } from '../../../SmallerComponents/Typography/Welcome/WelcomeHome';

const useStyles = makeStyles({ 
    paperGreeting: {
        alignItems: 'left',
        backgroundColor: '#FFFF',
        display: 'flex',
        height: '60%',
        marginTop: '20%',
        width: '85%', 
        marginLeft: '5%',
        marginRight: '5%',
        
         
    },
    divGreeting: {
        marginTop: '20%',
    },
});

export const PaperWelcome = () => {

    const classes = useStyles();

    return (
        
        <div className={classes.divGreeting}>
            <Paper 
                className={ classes.paperGreeting } 
                elevation={3}
            >
                
                <WelcomeHome />
                
            </Paper>
        </div>
    ) 
}
