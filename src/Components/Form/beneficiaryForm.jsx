import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Formik } from "formik";
import FormHelperText from "@material-ui/core/FormHelperText";
import { createBeneficiary, updateBeneficiary } from "../../Services/Calls";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(0),
    minWidth: 120,
    width: 230
  },
  selectEmpty: {
    marginTop: theme.spacing(0)
  }
}));

const capitalize = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const banks = [
  "activo",
  "bancaribe",
  "bancrecer",
  "banesco",
  "banplus",
  "bicentenario",
  "bnc",
  "caroni",
  "exterior",
  "fondo_comun",
  "mercantil",
  "plaza",
  "provincial",
  "tesoro",
  "venezuela",
  "100%banco"
];

const BeneficiaryForm = props => {
  const { setUser, filterTemporalData, beneficiary } = props;
  const classes = useStyles();
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  const history = useHistory();

  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const SignupSchema = Yup.object().shape({
    account_number: Yup.string()
      .min(20, "Numero de cuenta invalido")
      .max(20, "Numero de cuenta invalido")
      .required("Requerido"),
    name: Yup.string()
      .min(2, "Nombre invalido")
      .max(15, "Nombre invalido")
      .required("Requerido"),
    last_name: Yup.string()
      .min(2, "Apellido invalido")
      .max(15, "Apellido invalido")
      .required("Requerido"),
    bank: Yup.string().required("Requerido"),
    personal_id: Yup.string()
      .min(7, "Cedula invalida")
      .max(10, "Cedula invalida")
      .required("Requerido"),
    telephone_number: Yup.string()
      .min(12, "Numero de telefono invalido")
      .max(13, "Numero de telefono invalido")
      .required("Requerido"),
    mobile_pay: Yup.string()
      //  .min(2, 'Too Short!')
      .nullable(true)
      .min(10, "Numero invalido")
      .max(10, "Numero invalido")
  });
  return (
    <div>
      <Formik
        initialValues={{
          account_number:
            beneficiary === null ? "" : beneficiary.account_number,
          name: beneficiary === null ? "" : beneficiary.name,
          last_name: beneficiary === null ? "" : beneficiary.last_name,
          bank: beneficiary === null ? "" : beneficiary.bank,
          personal_id: beneficiary === null ? "" : beneficiary.personal_id,
          telephone_number:
            beneficiary === null ? "" : beneficiary.telephone_number,
          mobile_pay: beneficiary === null ? "" : beneficiary.mobile_pay
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, { setSubmitting }) => {
          if (beneficiary === null) {
            createBeneficiary(values, setUser, filterTemporalData);
            setSubmitting(false);
            history.push("/");
          } else {
            updateBeneficiary(
              values,
              setUser,
              filterTemporalData,
              beneficiary.id
            );
            setSubmitting(false);
            history.push("/");
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                type="tel"
                error={
                  errors.account_number &&
                  touched.account_number &&
                  errors.account_number !== null
                }
                helperText={
                  errors.account_number &&
                  touched.account_number &&
                  errors.account_number
                }
                label="Numero de cuenta"
                name="account_number"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.account_number}
              />
            </div>
            <div>
              <TextField
                helperText={errors.name && touched.name && errors.name}
                error={errors.name && touched.name && errors.name !== null}
                label="Nombre"
                name="name"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
            </div>
            <div>
              <TextField
                helperText={
                  errors.last_name && touched.last_name && errors.last_name
                }
                label="Apellido"
                name="last_name"
                variant="outlined"
                onChange={handleChange}
                error={
                  errors.last_name &&
                  touched.last_name &&
                  errors.last_name !== null
                }
                onBlur={handleBlur}
                value={values.last_name}
              />
            </div>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              error={errors.bank && touched.bank && errors.bank !== null}
            >
              <InputLabel
                ref={inputLabel}
                id="demo-simple-select-outlined-label"
              >
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
                {banks.map(bank => (
                  <MenuItem value={bank}>{capitalize(bank)}</MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {errors.bank && touched.bank && errors.bank}
              </FormHelperText>
            </FormControl>
            <div>
              <TextField
                type="tel"
                helperText={
                  errors.personal_id &&
                  touched.personal_id &&
                  errors.personal_id
                }
                label="Cedula"
                name="personal_id"
                variant="outlined"
                onChange={handleChange}
                error={
                  errors.personal_id &&
                  touched.personal_id &&
                  errors.personal_id !== null
                }
                onBlur={handleBlur}
                value={values.personal_id}
              />
            </div>
            <div>
              <TextField
                type="tel"
                helperText={
                  errors.telephone_number &&
                  touched.telephone_number &&
                  errors.telephone_number
                }
                error={
                  errors.telephone_number &&
                  touched.telephone_number &&
                  errors.telephone_number !== null
                }
                label="Numero de telefono"
                name="telephone_number"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.telephone_number}
              />
            </div>
            <div>
              <TextField
                type="tel"
                helperText={
                  errors.mobile_pay && touched.mobile_pay && errors.mobile_pay
                }
                label="Pago Movil"
                name="mobile_pay"
                variant="outlined"
                onChange={handleChange}
                error={
                  errors.mobile_pay &&
                  touched.mobile_pay &&
                  errors.mobile_pay !== null
                }
                onBlur={handleBlur}
                value={values.mobile_pay}
              />
            </div>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              disabled={isSubmitting}
            >
              {beneficiary === null ? "CREAR" : "EDITAR"}
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default BeneficiaryForm;
