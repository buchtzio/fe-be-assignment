import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface LoginFormProps {
  setError: (error: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ setError }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(username, password);
      navigate('/');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
      style={{ width: '100%', maxWidth: '400px' }}
    >
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        size="small"
        sx={{ marginBottom: '10px' }}
        autoFocus
      />
      <TextField
        label="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
        size="small"
        sx={{ marginBottom: '10px' }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        size="small"
        sx={{ marginTop: '10px' }}
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
