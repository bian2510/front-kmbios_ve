import React from "react";
import TextField from "@material-ui/core/TextField";

export default function InputForm(props) {
  const { errors, touched, values, handleBlur, handleChange, name, label, type } = props;
  return (
    <div>
      <TextField
        type={type || "text"}
        error={errors && touched && errors !== null}
        helperText={errors && touched && errors}
        label={label}
        name={name}
        variant="outlined"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values}
      />
    </div>
  );
}
