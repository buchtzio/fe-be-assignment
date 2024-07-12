import React from 'react';
import { Typography } from '@mui/material';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;

  return (
    <Typography color="error" variant="body2" align="center">
      {message}
    </Typography>
  );
};

export default ErrorMessage;
