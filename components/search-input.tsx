import React, { useState } from 'react';
import { IconButton, InputBase, makeStyles, Paper } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import { useRouter } from 'next/dist/client/router';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.light,
    padding: theme.spacing(2),
  },
  form: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  search: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    maxWidth: '100%',
    width: 600,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

const SearchInput = (): JSX.Element => {
  const classes = useStyles();

  const router = useRouter();

  const [search, setSearch] = useState('');

  const handleSubmit = (event: any) => {
    event.preventDefault();

    router.push(`/?q=${search}`);
  };

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <Paper className={classes.search}>
          <InputBase
            className={classes.input}
            placeholder="Search for products"
            inputProps={{ 'aria-label': 'search for products' }}
            name={'search'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
          <IconButton type="submit" className={classes.iconButton} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </form>
    </div>
  );
};

export default SearchInput;
