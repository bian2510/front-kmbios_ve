import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

export default function FormSignIn() {
  const classes = useStyles();

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <form className={classes.root} noValidate autoComplete="off">
        <div>
        <TextField error label="" placeholder="Email" />
        </div>
        <div>
        <TextField error label="" placeholder="Contraseña" type="password"/>
      </div>
      <Button variant="contained" type="submit" color="primary">
        Primary
      </Button>
      </form>
    </div>
  );
}