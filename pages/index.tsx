import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import Header from '../components/header';
import SearchInput from '../components/search-input';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    textAlign: 'center',
  },
}));

export default function Home(): JSX.Element {
  const classes = useStyles();

  return (
    <>
      <Header />
      <SearchInput />

      <Container className={classes.container}>
        <Typography>Start by typing something...</Typography>
      </Container>
    </>
  );
}
