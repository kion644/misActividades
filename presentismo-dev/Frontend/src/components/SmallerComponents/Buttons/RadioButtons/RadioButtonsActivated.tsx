import { makeStyles     } from '@material-ui/core/styles';
import   Radio            from '@material-ui/core/Radio';
import   FormControlLabel from '@material-ui/core/FormControlLabel';

interface valueRadioButton {
    value    : string;
    disabled : boolean;
}

const useStyles = makeStyles({
    radio: {
        color: '#007dc4',
        '&:hover': {
            color: '#F6921E',},
        fontFamily:'"Montserrat", sans-serif'
    },
});

export const RadioButtonsActivated = ({ value, disabled }: valueRadioButton) => {

    const classes = useStyles();

    return (
        <FormControlLabel 
            value=     { value    } 
            label=     { value    } 
            disabled=  { disabled }
            control=   {
                <Radio 
                className= { classes.radio }
                color={'secondary'}
                />
            } 
        />
    )
}
 