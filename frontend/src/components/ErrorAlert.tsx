import { Alert, Snackbar } from '@mui/material';
import React from 'react';
import { ErrorAlertProps } from '../interfaces';

export default function ErrorAlert(props: ErrorAlertProps) {
  const { autoHideDuration, handleClose, open, message } = props;

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
