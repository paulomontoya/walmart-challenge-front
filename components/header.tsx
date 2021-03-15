import React from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: theme.palette.primary.main,
    padding: theme.spacing(2),
    display: 'grid',
    gridTemplateColumns: '30px 1fr 30px',
    justifyContent: 'center',
  },
  menuButton: {},
  menuIcon: {
    fill: '#FFF',
  },
  logo: {
    color: '#FFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  LogoIcon: {
    fill: '#FFF',
    marginLeft: theme.spacing(1),
  },
}));

const Header = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="open drawer"
      >
        <MenuIcon className={classes.menuIcon} />
      </IconButton>

      <div className={classes.logo}>
        <span>Walmart Challenge</span>
      </div>

      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="open drawer"
      >
        <LocalShippingIcon className={classes.LogoIcon} />
      </IconButton>
    </div>
  );
};

export default Header;
