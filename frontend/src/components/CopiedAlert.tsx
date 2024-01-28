import { Alert, Snackbar } from '@mui/material'
import React from 'react'
import { CopiedAlertProps } from '../interfaces';

export default function CopiedAlert(props: CopiedAlertProps) {

  const { autoHideDuration, handleClose, open, message } = props;

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}
