import React, { useState, useEffect } from "react";
import InputForm from "./InputForm";
import Button from "@material-ui/core/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { DropzoneDialog } from "material-ui-dropzone";
import { updateTransaction } from '../../Services/Transactions/TransactionsRequest'

export default function TransactionEditForm (props)  {
  const { transaction } = props;
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [disable, setDisable] = useState(true);
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
      .max(15, "Monto incorrecto"),
  });
  return (<div>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
          >
            Comprobante
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            id={transaction.id}
            type="submit"
            color="primary"
            disabled={disable}
            onClick={() => {
              updateTransaction(transaction, file);
              setDisable(true)
            }}
          >
            Actualizar
          </Button>
          <DropzoneDialog
            acceptedFiles={["image/*", ".pdf"]}
            cancelButtonText={"cancel"}
            submitButtonText={"submit"}
            maxFileSize={5000000}
            open={open}
            onClose={() => setOpen(false)}
            onSave={(files) => {
              console.log("Files:", files);
              setDisable(false)
              console.log(files[0])
              setFile(files)
              setOpen(false);
            }}
            showPreviews={true}
            showFileNamesInPreview={true}
          />
        </div>
  </div>)
  
};
