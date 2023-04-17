import {
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { ItemsHeader } from '../Header/ItemsHeader/ItemsHeader';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);
interface props {
  rol: string;
  setRol: (value: string) => void;

}

export const AppBarHeader = ({ rol, setRol}: props) => {

  const classes = useStyles();

  return (
    <div >
      {/* <AppBar
        position="static"
        color="inherit"
        className={classes.root}
      > */}
     
          <ItemsHeader />
      
      {/* </AppBar> */}
    </div>
  )
}
