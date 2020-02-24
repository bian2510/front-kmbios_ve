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
import InputForm from "./InputForm";

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

const BeneficiaryEditForm = props => {
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
          account_number: beneficiary.account_number,
          name: beneficiary.name,
          last_name: beneficiary.last_name,
          bank: beneficiary.bank,
          personal_id: beneficiary.personal_id,
          telephone_number: beneficiary.telephone_number,
          mobile_pay: beneficiary.mobile_pay
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, { setSubmitting }) => {
          updateBeneficiary(
            values,
            setUser,
            filterTemporalData,
            beneficiary.id
          );
          setSubmitting(false);
          history.push("/");
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
            <InputForm
              values={values.account_number}
              errors={errors.account_number}
              touched={touched.account_number}
              handleChange={handleChange}
              handleBlur={handleBlur}
              name={"account_number"}
              label={"Numero de cuenta"}
              type={"tel"}
            />
            <InputForm
              values={values.name}
              errors={errors.name}
              touched={touched.name}
              handleChange={handleChange}
              handleBlur={handleBlur}
              name={"name"}
              label={"Nombre"}
            />
            <InputForm
              values={values.last_name}
              errors={errors.last_name}
              touched={touched.last_name}
              handleChange={handleChange}
              handleBlur={handleBlur}
              name={"last_name"}
              label={"Apellido"}
            />
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
            <InputForm
              values={values.personal_id}
              errors={errors.personal_id}
              touched={touched.personal_id}
              handleChange={handleChange}
              handleBlur={handleBlur}
              name={"personal_id"}
              label={"Cedula"}
              type={"tel"}
            />
            <InputForm
              values={values.telephone_number}
              errors={errors.telephone_number}
              touched={touched.telephone_number}
              handleChange={handleChange}
              handleBlur={handleBlur}
              name={"telephone_number"}
              label={"Numero de telefono"}
              type={"tel"}
            />
            <InputForm
              values={values.mobile_pay}
              errors={errors.mobile_pay}
              touched={touched.mobile_pay}
              handleChange={handleChange}
              handleBlur={handleBlur}
              name={"mobile_pay"}
              label={"Pago movil"}
              type={"tel"}
            />
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

export default BeneficiaryEditForm;
