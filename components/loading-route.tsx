import React, { FunctionComponent } from 'react';
import { useRouter } from 'next/router';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    backDrop: {
      zIndex: 100,
    },
    spinner: {
      color: '#fff',
      position: 'fixed',
      top: '50vh',
      right: '50vw',
      zIndex: 101,
    },
  }),
);
const LoadingRoute: FunctionComponent = () => {
  const router = useRouter();
  const classes = useStyles();

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  });
  return loading ? (
    <>
      <Backdrop open={loading} className={classes.backDrop} />
      <CircularProgress className={classes.spinner} />
    </>
  ) : null;
};

export default LoadingRoute;
