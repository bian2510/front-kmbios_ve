import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Formik } from 'formik';
import { createBeneficiary } from '../../Services/Calls'

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

  const handleChangeBank = event => {
    setBank(event.target.value);
  };
  return (
    <div>
      <Formik
      initialValues={{ account_number: '', name: '', last_name: '', bank: bank,
      personal_id: '',  telephone_number: '', mobile_pay: '' 
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log(values);
          createBeneficiary(user, setUser, values)
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
<form onSubmit={handleSubmit}>
      <div>
        <TextField helperText={''} error={true} label="Numero de cuenta" name="account_number" variant="outlined" onChange={handleChange}
            onBlur={handleBlur}
            value={values.account_number}/>
      </div>
      <div>
        <TextField label="Nombre" name="name" variant="outlined" onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}/>
      </div>
      <div>
        <TextField label="Apellido" name="last_name" variant="outlined" onChange={handleChange}
            onBlur={handleBlur}
            value={values.last_name}/>
      </div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
          Banco
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={bank}
          onChange={handleChangeBank}
          labelWidth={labelWidth}
        >
          <MenuItem value="">
          </MenuItem>
          <MenuItem value={"Mercantil"}>Mercantil</MenuItem>
          <MenuItem value={"Banesco"}>Banesco</MenuItem>
          <MenuItem value={"Provincial"}>Provincial</MenuItem>
        </Select>
      </FormControl>
      <div>
        <TextField label="Cedula" name="personal_id" variant="outlined" onChange={handleChange}
            onBlur={handleBlur}
            value={values.personal_id}/>
      </div>
      <div>
        <TextField label="Numero de telefono" name="telephone_number" variant="outlined" onChange={handleChange}
            onBlur={handleBlur}
            value={values.telephone_number}/>
      </div>
      <div>
        <TextField label="Pago Movil" name="mobile_pay" variant="outlined" onChange={handleChange}
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