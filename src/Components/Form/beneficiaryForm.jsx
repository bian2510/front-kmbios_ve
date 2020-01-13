import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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

export default function BeneficiaryForm() {
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

  return (
    <div>
      <form>
      <div>
        <TextField label="Numero de cuenta" variant="outlined" />
      </div>
      <div>
        <TextField label="Nombre" variant="outlined" />
      </div>
      <div>
        <TextField label="Apellido" variant="outlined" />
      </div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
          Banco
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={bank}
          onChange={handleChange}
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
        <TextField label="Cedula" variant="outlined" />
      </div>
      <div>
        <TextField label="Numero de telefono" variant="outlined" />
      </div>
      <div>
        <TextField label="Pago Movil" variant="outlined" />
      </div>
      <Button variant="contained" type="submit" color="primary">
        Crear
      </Button>
      </form>
    </div>
  );
}