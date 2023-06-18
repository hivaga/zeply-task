import {Alert, Snackbar} from "@mui/material";
import React from "react";
import styles from './error-message.module.scss';

export interface ErrorMessageProps {
  open: boolean
  onCloseHandler?: (...rest: any[]) => any
  message: string
}

export function ErrorMessage(props: ErrorMessageProps) {
  return (
    <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}}
              autoHideDuration={5000}
              open={props.open}>
      <Alert severity="error">{props.message}</Alert>
    </Snackbar>
  );
}

export default ErrorMessage;
