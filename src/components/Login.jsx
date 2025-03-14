import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  FormControl,
  FormHelperText,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState({});
  const navigate = useNavigate();

  const { email, password } = form;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => {
      const updatedForm = { ...prevForm, [name]: value };
      validateForm(updatedForm);
      return updatedForm;
    });
  };

  const validateForm = (formValues = form) => {
    let errors = {};
    let isValid = true;

    const { email, password } = formValues;

    if (!email) {
      errors.email = 'This field is required';
      isValid = false;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      errors.email = 'Invalid email format';
      isValid = false;
    }

    if (!password) {
      errors.password = 'This field is required';
      isValid = false;
    }

    setError(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
      const foundUser = existingUsers.find(
        (user) => user.email === email && user.password === password
      );

      if (foundUser) {
        localStorage.setItem('userData', JSON.stringify(foundUser));
        navigate('/');
      } else {
        alert('Invalid email or password!');
        navigate('/auth');
      }

      setForm({
        email: '',
        password: '',
      });

      setError({});
    }
  };

  return (
    <Box
      sx={{
        px: 3,
        py: 2,
      }}
    >
      <Box component="form" onSubmit={handleSubmit}>
        <Typography variant="h6" align="center" sx={{ fontWeight: 'bold' }}>
          SIGN IN
        </Typography>
        <Typography align="center" sx={{ mb: 4, fontSize: '0.9rem' }}>
          Sign in to apply for a job
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            alignItems: 'center',
          }}
        >
          <FormControl fullWidth margin="none" error={Boolean(error.email)}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: '#5bbc2e', fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
            />
            {error.email && <FormHelperText>{error.email}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth margin="none" error={Boolean(error.password)}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={password}
              onChange={handleChange}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: '#5bbc2e', fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
            />
            {error.password && (
              <FormHelperText>{error.password}</FormHelperText>
            )}
          </FormControl>

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: '#002c6e',
              border: 'none',
              outline: 'none',
              color: 'white',
              '&:hover': { backgroundColor: '#001f4d' },
              my: 1,
              py: 2,
            }}
          >
            SIGN IN
          </Button>

          <Typography
            align="center"
            sx={{
              fontSize: '0.9rem',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            <a
              href="#"
              style={{
                textDecoration: 'none',
                color: '#1976d2',
              }}
            >
              Forgot your password?
            </a>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
