import {Alert, Snackbar} from "@mui/material";
import React from "react";

export interface ErrorMessageProps {
  open: boolean
  setOpen: React.Dispatch<boolean>
  message: string
  timeout?: number
}

export function ErrorMessage(props: ErrorMessageProps) {
  setTimeout(() => {
    props.setOpen(false);
  }, props.timeout ?? 5000);
  return (
    <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}}
              open={props.open}>
      <Alert severity="error">{props.message}</Alert>
    </Snackbar>
  );
}

export default ErrorMessage;
