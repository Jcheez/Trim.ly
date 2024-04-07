import { Alert, Snackbar, useMediaQuery } from '@mui/material';
import React from 'react';
import { PopupAlertProps } from '../interfaces';

export default function PopupAlert(props: PopupAlertProps) {
  const { autoHideDuration, handleClose, open, message, type } = props;

  const isDisplayWidthMoreThan600 = useMediaQuery('(min-width:600px)');

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={{vertical: isDisplayWidthMoreThan600 ? 'bottom' :'top', horizontal: 'left'}}
    >
      <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
