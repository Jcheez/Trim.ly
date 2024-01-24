import { Box, TextField, Typography } from '@mui/material';
import React from 'react';
import { TextFieldWithTitleProps } from '../interfaces';

export default function TextFieldWithTitle(props: TextFieldWithTitleProps) {
  const { placeholder, type, title, handleSetState, value, error } = props;

  return (
    <Box>
      <Typography textAlign={'left'} variant="h6" mb={1}>
        {title}
      </Typography>
      <TextField
        variant="outlined"
        placeholder={placeholder}
        fullWidth
        size="small"
        type={type}
        onChange={(e) => handleSetState(e.target.value)}
        value={value}
        error={error.length > 0}
        helperText={error}
      />
    </Box>
  );
}
