import { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import LoginForm from '../components/LoginForm';
import ErrorMessage from '../components/ErrorMessage';

const LoginPage = () => {
  const [error, setError] = useState('');

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <LoginForm setError={setError} />
        <ErrorMessage message={error} />
      </Box>
    </Container>
  );
};

export default LoginPage;
