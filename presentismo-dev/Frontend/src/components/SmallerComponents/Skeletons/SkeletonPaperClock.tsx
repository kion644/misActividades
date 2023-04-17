

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(() => ({
  image: {
    backgroundColor: '#FFFF',
    height: '90%',
    marginBottom: '15%',
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginLeft: '5%',
    marginRight: '5%',
  },
}));

export const SkeletonPaperClock = (props: { loading?: boolean }) => {
  const { loading = false } = props;
  const classes = useStyles();

  return (
    <div >
      {/* {loading ? (
        <Skeleton variant="rect" className={classes.image}>
          <PaperClock />
        </Skeleton>
      ) : (
        <PaperClock></PaperClock>
      )} */}
    </div>
  );
}

