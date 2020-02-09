import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Formik } from 'formik';
import FormHelperText from '@material-ui/core/FormHelperText';
import { createBeneficiary } from '../../Services/Calls'
import * as Yup from 'yup';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(0),
    minWidth: 120,
    width: 230,
  },
  selectEmpty: {
    marginTop: theme.spacing(0),
  },
}));

export default function BeneficiaryForm(props) {
  const { setUser, user } = props;
  const classes = useStyles();
  const [bank, setBank] = React.useState('');

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = event => {
    setBank(event.target.value);
  };
  const SignupSchema = Yup.object().shape({
    account_number: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    last_name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    bank: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    personal_id: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    telephone_number: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    mobile_pay: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
  });
  return (
    <div>
      <Formik
      initialValues={{ account_number: '', name: '', last_name: '', bank: '',
      personal_id: '',  telephone_number: '', mobile_pay: '' 
      }}
      validationSchema={SignupSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log(values);
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
<form onSubmit={handleSubmit}>
      <div>
        <TextField error={errors.account_number && touched.account_number && errors.account_number !== null}
            helperText={errors.account_number && touched.account_number && errors.account_number} label="Numero de cuenta" name="account_number" variant="outlined" onChange={handleChange}
            onBlur={handleBlur}
            value={values.account_number}/>
      </div>
      <div>
        <TextField helperText={errors.name && touched.name && errors.name} 
            error={errors.name && touched.name && errors.name !== null}
            label="Nombre" name="name" variant="outlined" onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}/>
      </div>
      <div>
        <TextField helperText={errors.last_name && touched.last_name && errors.last_name}
            label="Apellido" name="last_name" variant="outlined" onChange={handleChange}
            error={errors.last_name && touched.last_name && errors.last_name !== null}
            onBlur={handleBlur}
            value={values.last_name}/>
      </div>
      <FormControl variant="outlined" className={classes.formControl} error={errors.bank && touched.bank && errors.bank !== null}>
        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
          Banco
        </InputLabel>
        <Select
          name="bank"
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          onChange={handleChange}
          value={values.bank}      
          labelWidth={labelWidth}
        >
          <MenuItem value={"Mercantil"}>Mercantil</MenuItem>
          <MenuItem value={"Banesco"}>Banesco</MenuItem>
          <MenuItem value={"Provincial"}>Provincial</MenuItem>
        </Select>
        <FormHelperText>{errors.bank && touched.bank && errors.bank}</FormHelperText>
      </FormControl>
      <div>
        <TextField helperText={errors.personal_id && touched.personal_id && errors.personal_id} label="Cedula" name="personal_id" variant="outlined" onChange={handleChange}
            error={errors.personal_id && touched.personal_id && errors.personal_id !== null}
            onBlur={handleBlur}
            value={values.personal_id}/>
      </div>
      <div>
        <TextField helperText={errors.telephone_number && touched.telephone_number && errors.telephone_number}
            error={errors.telephone_number && touched.telephone_number && errors.telephone_number !== null}
            label="Numero de telefono" name="telephone_number" variant="outlined" onChange={handleChange}
            onBlur={handleBlur}
            value={values.telephone_number}/>
      </div>
      <div>
        <TextField helperText={errors.mobile_pay && touched.mobile_pay && errors.mobile_pay} label="Pago Movil" name="mobile_pay" variant="outlined" onChange={handleChange}
            error={errors.mobile_pay && touched.mobile_pay && errors.mobile_pay !== null}
            onBlur={handleBlur}
            value={values.mobile_pay}/>
      </div>
      <Button variant="contained" type="submit" color="primary" disabled={isSubmitting}>
        Crear
      </Button>
      </form>
      )}
    </Formik>
    </div>
  );
}