import React, { FunctionComponent } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Button, Grid, makeStyles } from '@material-ui/core';
import Header from '../components/header';
import SearchInput from '../components/search-input';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import LoadingRoute from '../components/loading-route';
import { formatDecimalDiscount, formatPrice } from '../utils/helpers';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    textAlign: 'center',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
  },
  description: {
    fontSize: 14,
    marginBottom: theme.spacing(2),
  },
  image: {
    maxWidth: '100%',
    position: 'relative',

    '& > img': {
      maxWidth: '100%',
    },
  },
  discount: {
    display: 'inline-block',
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: theme.palette.error.dark,
    color: theme.palette.error.contrastText,
    padding: 6,
    lineHeight: '1em',
    borderRadius: 3,
    fontSize: '.9em',
  },
  oldPrice: {
    color: theme.palette.grey[400],
    textDecoration: 'line-through',
    fontSize: '.9em',
  },
  price: {
    fontSize: '1.3em',
    marginBottom: theme.spacing(2),
  },
  button: {
    width: '100%',
    margin: 'auto 0 0 0',
  },
}));

type Props = {
  searchResults: {
    brand: string;
    description: string;
    discount: number;
    image: string;
    price: number;
    priceWithDiscount: number;
    score: number;
    sku: number;
  }[];
  error: string | null;
};

const Search: FunctionComponent<Props> = ({ searchResults, error }) => {
  const classes = useStyles();

  return (
    <>
      <LoadingRoute />
      <Header />
      <SearchInput />

      <Container className={classes.container}>
        {error && <Typography>{error}</Typography>}

        <Grid container spacing={6}>
          {searchResults.map((result) => (
            <Grid key={result.sku} item xs={3} className={classes.item}>
              <Typography>{result.brand}</Typography>

              <div className={classes.image}>
                <img src={result.image} />

                {result.discount > 0 && (
                  <span className={classes.discount}>{formatDecimalDiscount(result.discount)}</span>
                )}
              </div>

              <Typography className={classes.description}>{result.description}</Typography>

              {result.discount > 0 && (
                <Typography className={classes.oldPrice}>{formatPrice(result.price)}</Typography>
              )}

              <Typography className={classes.price}>
                {formatPrice(result.discount ? result.priceWithDiscount : result.price)}
              </Typography>

              <Button variant="contained" color="primary" className={classes.button}>
                See more
              </Button>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { q } = query;

  let searchResults: any = [];
  let error = null;

  if (!q) {
    return {
      props: {
        searchResults,
        error: 'You must fill the search field',
      },
    };
  }

  try {
    const response = await axios.get(`${process.env.BACKEND_URL}/products/search/${q}`);
    searchResults = response.data;
  } catch (err) {
    console.error(err);

    error = 'Error doing the search request';

    const axiosError = err?.response?.data?.error?.errors[0]?.messages?.en;
    if (axiosError) error = axiosError;
  }

  return {
    props: {
      searchResults,
      error,
    },
  };
};

export default Search;
