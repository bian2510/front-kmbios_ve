import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { signOutUser, signOutAdmin } from '../../Services/Calls.js'
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function MenuListComposition(props) {
  const { setSession, admin, setAdmin } = props
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const history = useHistory()

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    handleToggle();
  };

  const logOut = event => {
    handleClose(event);
    console.log(admin);
    (admin === true) ? signOutAdmin(setSession, setAdmin, admin) : signOutUser(setSession)
  }

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current && !open) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <div>
        <Button
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="open drawer"
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : ''}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <MenuIcon/>
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <Link to="/">
                    <MenuItem onClick={handleClose}>Cuentas</MenuItem>
                    </Link>
                    <Link to="/transacciones">
                      <MenuItem onClick={handleClose}>Transacciones</MenuItem>
                    </Link>
                    <Link to="/crear_beneficiario">
                      <MenuItem onClick={handleClose}>Agregar cuenta</MenuItem>
                    </Link>
                    <MenuItem onClick={logOut}>
                      Cerrar sesion
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}