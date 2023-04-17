

import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import { Watch } from '../../Home/Body/PaperClock/Watch/Watch';


interface props {
  time: any;
  setTime: (value: any) => void;
  loading: boolean;
}

const useStyles = makeStyles(() => ({
  root:{
    backgroundColor: '#FFFF',
    height: '95%',
    marginBottom: '15%',
    marginTop:'0%',
    width: '85%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginLeft: '5%',
    marginRight: '5%',
    fontFamily:'"Montserrat", sans-serif',

},
}));

export const SkeletonClock = (props: { loading?: boolean, timer?: any, setTimer?: (value: any) => void }) => {
  const { loading = false } = props;
  const { timer = null } = props;
  const { setTimer = () => { } } = props;
  const classes = useStyles();


  return (
    <div >
      {loading ? (
     
        
          <Skeleton className={classes.root} animation="wave" />
    

        
      ) : (
        <Watch time={timer} setTime={setTimer} loadign={loading}></Watch>
      )}
    </div>
  );
}

