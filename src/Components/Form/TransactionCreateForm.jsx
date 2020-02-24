import React from "react";
import InputForm from "./InputForm";
import Button from "@material-ui/core/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

const capitalize = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const BeneficiaryEditForm = props => {
  const { setUser, filterTemporalData, beneficiary } = props;
  const history = useHistory();

  const SignupSchema = Yup.object().shape({
    money_received: Yup.string()
      .min(3, "Menor al monto minimo")
      .max(10, "Mayor al monto minimo")
      .required("Requerido"),
    taxe: Yup.string()
      .min(3, "Tasa incorrecta")
      .max(3, "Tasa incorrecta")
      .required("Requerido"),
    money_sent: Yup.string()
      .min(2, "Apellido invalido")
      .max(15, "Apellido invalido")
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
          taxe: "",
          money_sent: ""
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          setSubmitting(false);
          //history.push("/");
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
              values={values.taxe}
              errors={errors.taxe}
              touched={touched.taxe}
              handleChange={handleChange}
              handleBlur={handleBlur}
              name={"taxe"}
              label={"Tasa"}
              type={"tel"}
            />
            <InputForm
              values={(values.money_sent = values.taxe * values.money_received)}
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
