import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles, createPalette } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Formik } from 'formik';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

export default function FormSignIn(props) {
  const { setUser, signIn} = props
  const classes = useStyles();

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <Formik
      initialValues={{ email: '', password: '' }}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          signIn(values, setUser)
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
          <div><TextField
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          {errors.email && touched.email && errors.email}
          </div>
          <div>
          <TextField
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          </div>
          {errors.password && touched.password && errors.password}
          <Button type="submit" disabled={isSubmitting} variant="contained" color="primary">
            Iniciar sesión
          </Button>
        </form>
      )}
      </Formik>
    </div>
  );
}
