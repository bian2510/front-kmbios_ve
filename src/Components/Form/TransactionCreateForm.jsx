import React from "react";
import InputForm from "./InputForm";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { Formik } from "formik";
import * as Yup from "yup";
import { createTransaction } from "../../Services/Transactions/TransactionsRequest";
import { useHistory } from "react-router-dom";
import { capitalize } from "../../Commons/Commons.js"
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";

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

const BeneficiaryEditForm = props => {
  const [labelWidth, setLabelWidth] = React.useState(0);
  const classes = useStyles();
  const inputLabel = React.useRef(null);
  const { beneficiary, setSession, setTransactions } = props;
  const history = useHistory();
  const SignupSchema = Yup.object().shape({
    money_received: Yup.string()
      .min(3, "Menor al monto minimo")
      .max(10, "Mayor al monto minimo")
      .required("Requerido"),
    rate: Yup.string()
      .min(3, "Tasa incorrecta")
      .max(3, "Tasa incorrecta")
      .required("Requerido"),
    user_id: Yup.string().required("Requerido"),
    money_sent: Yup.string()
      .min(2, "Monto incorrecto")
      .max(15, "Monto incorrecto")
  });
  return (
    <div>
      <div>
        <p>
          Transaccion a:{" "}
          <b>
            {capitalize(beneficiary.name)} {beneficiary.last_name}
          </b>{" "}
          CI: <b> {beneficiary.personal_id}</b> Numero de cuenta:{" "}
          <b>{beneficiary.account_number}</b> Banco:{" "}
          <b>{capitalize(beneficiary.bank)}</b>
        </p>
      </div>

      <Formik
        initialValues={{
          money_received: "",
          rate: "",
          user_id: "",
          money_sent: ""
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, { setSubmitting }) => {
          createTransaction(values, beneficiary.id, setSession, setTransactions)
          setSubmitting(false);
          history.push("/transacciones");
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
          <form onSubmit={handleSubmit} autoComplete="off">
            <InputForm
              values={values.money_received}
              errors={errors.money_received}
              touched={touched.money_received}
              handleChange={handleChange}
              handleBlur={handleBlur}
              name={"money_received"}
              label={"Dinero recibido"}
              type={"tel"}
            />
            <InputForm
              values={values.rate}
              errors={errors.rate}
              touched={touched.rate}
              handleChange={handleChange}
              handleBlur={handleBlur}
              name={"rate"}
              label={"Tasa"}
              type={"tel"}
            />
            <FormControl
              variant="outlined"
              className={classes.formControl}
              error={errors.beneficiary && touched.beneficiary && errors.beneficiary !== null}
            >
              <InputLabel
                ref={inputLabel}
                id="demo-simple-select-outlined-label"
              >
                Usuario
              </InputLabel>
              <Select
                  name="user_id"
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  onChange={handleChange}
                  value={values.user_id}
                  labelWidth={labelWidth}
                >
                  {beneficiary.users.map(user => (
                    <MenuItem value={user.id}>{user.email}</MenuItem>
                  ))}
              </Select>
              <FormHelperText>
                {errors.beneficiary && touched.beneficiary && errors.beneficiary}
              </FormHelperText>
            </FormControl>
            <InputForm
              values={(values.money_sent = values.rate * values.money_received)}
              errors={errors.money_sent}
              touched={touched.money_sent}
              handleChange={handleChange}
              handleBlur={handleBlur}
              name={"money_sent"}
              label={"Dinero a Enviar"}
              type={"money_sent"}
            />
            <Button
              variant="contained"
              type="submit"
              color="primary"
              disabled={isSubmitting}
            >
              {"Crear transaccion"}
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default BeneficiaryEditForm;
