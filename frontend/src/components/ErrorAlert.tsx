import { Alert, Snackbar, useMediaQuery } from '@mui/material';
import React from 'react';
import { ErrorAlertProps } from '../interfaces';

export default function ErrorAlert(props: ErrorAlertProps) {
  const { autoHideDuration, handleClose, open, message } = props;

  const isDisplayWidthMoreThan600 = useMediaQuery('(min-width:600px)');

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={{vertical: isDisplayWidthMoreThan600 ? 'bottom' :'top', horizontal: 'left'}}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
