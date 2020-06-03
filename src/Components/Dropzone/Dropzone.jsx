import { DropzoneDialog } from "material-ui-dropzone";
import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";

const [open, setOpen] = useState(false);

export default function uploadButton(props) {
  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Comprobante
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
          setOpen(false);
        }}
        showPreviews={true}
        showFileNamesInPreview={true}
      />
    </div>
  );
}
