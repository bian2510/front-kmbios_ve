import React from 'react';
import InputForm from './InputForm'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Formik } from 'formik';
import { signIn } from '../../Services/Calls'
const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

export default function FormSignIn(props) {
  const { setUser } = props
  const classes = useStyles();

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <Formik
      initialValues={{ email: '', password: '' }}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Requerido';
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
          <InputForm
              values={values.email}
              errors={errors.email}
              touched={touched.email}
              handleChange={handleChange}
              handleBlur={handleBlur}
              name={"email"}
              label={"Email"}
              type={"email"}
          />
          <InputForm
              values={values.password}
              errors={errors.password}
              touched={touched.password}
              handleChange={handleChange}
              handleBlur={handleBlur}
              name={"password"}
              label={"Contraseña"}
              type={"password"}
          />
          <Button type="submit" disabled={isSubmitting} variant="contained" color="primary">
            Iniciar sesión
          </Button>
        </form>
      )}
      </Formik>
    </div>
  );
}
