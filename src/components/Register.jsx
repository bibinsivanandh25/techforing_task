import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import { useState } from 'react';

const genderOptions = [
  { id: 1, gender: 'Male' },
  { id: 2, gender: 'Female' },
  { id: 3, gender: 'Others' },
];

const Register = ({ onRegisterSuccess }) => {
  const [form, setForm] = useState({
    fullName: '',
    phoneNumber: '',
    dob: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [gender, setGender] = useState('');
  const [error, setError] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const { fullName, phoneNumber, dob, email, password, confirmPassword } = form;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => {
      const updatedForm = { ...prevForm, [name]: value };
      validateForm(updatedForm, gender);
      return updatedForm;
    });
  };

  const handleGenderChange = (event) => {
    const selectedGender = event.target.value;
    setGender(selectedGender);
    validateForm(form, selectedGender);
  };

  const validateForm = (formValues = form, selectedGender = gender) => {
    let errors = {};
    let isValid = true;

    const { fullName, phoneNumber, dob, email, password, confirmPassword } =
      formValues;

    if (!fullName.trim()) {
      errors.fullName = 'This field is required';
      isValid = false;
    }

    if (!phoneNumber) {
      errors.phoneNumber = 'This field is required';
      isValid = false;
    } else if (!/^[0-9]{10}$/.test(phoneNumber)) {
      errors.phoneNumber = 'Invalid phone number';
      isValid = false;
    }

    if (!dob) {
      errors.dob = 'This field is required';
      isValid = false;
    }

    if (!selectedGender) {
      errors.gender = 'This field is required';
      isValid = false;
    }

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
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
      isValid = false;
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'This field is required';
      isValid = false;
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setError(errors);
    setIsFormValid(isValid);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      fullName,
      phoneNumber,
      dob,
      gender,
      email,
      password,
    };

    if (validateForm()) {
      const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
      existingUsers.push(payload);
      localStorage.setItem('users', JSON.stringify(existingUsers));
      localStorage.setItem('userData', JSON.stringify(payload));

      onRegisterSuccess();

      setForm({
        fullName: '',
        phoneNumber: '',
        dob: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      setGender('');
      setError({});
      setIsFormValid(false);
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
          SIGN UP
        </Typography>
        <Typography align="center" sx={{ mb: 4, fontSize: '0.9rem' }}>
          Register to apply for a job
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            alignItems: 'center',
          }}
        >
          <FormControl fullWidth margin="none" error={Boolean(error.fullName)}>
            <TextField
              fullWidth
              label="Full Name"
              type="text"
              name="fullName"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: '#5bbc2e', fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
              value={fullName}
              onChange={handleChange}
            />
            {error.fullName && (
              <FormHelperText>{error.fullName}</FormHelperText>
            )}
          </FormControl>

          <FormControl
            fullWidth
            margin="none"
            error={Boolean(error.phoneNumber)}
          >
            <TextField
              fullWidth
              label="Phone Number"
              type="tel"
              name="phoneNumber"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon sx={{ color: '#5bbc2e', fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
              value={phoneNumber}
              onChange={handleChange}
            />
            {error.phoneNumber && (
              <FormHelperText>{error.phoneNumber}</FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth margin="none" error={Boolean(error.dob)}>
            <TextField
              fullWidth
              label="Date of Birth"
              type="date"
              name="dob"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              value={dob}
              onChange={handleChange}
            />
            {error.dob && <FormHelperText>{error.dob}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth margin="none" error={Boolean(error.gender)}>
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              value={gender}
              name="gender"
              onChange={handleGenderChange}
              label="Gender"
            >
              {genderOptions.map((option) => (
                <MenuItem key={option.id} value={option.gender}>
                  {option.gender}
                </MenuItem>
              ))}
            </Select>
            {error.gender && <FormHelperText>{error.gender}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth margin="none" error={Boolean(error.email)}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              name="email"
              variant="outlined"
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
              value={email}
              onChange={handleChange}
            />
            {error.email && <FormHelperText>{error.email}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth margin="none" error={Boolean(error.password)}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              name="password"
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
              value={password}
              onChange={handleChange}
            />
            {error.password && (
              <FormHelperText>{error.password}</FormHelperText>
            )}
          </FormControl>

          <FormControl
            fullWidth
            margin="none"
            error={Boolean(error.confirmPassword)}
          >
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
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
              value={confirmPassword}
              onChange={handleChange}
            />
            {error.confirmPassword && (
              <FormHelperText>{error.confirmPassword}</FormHelperText>
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
              my: 2,
              py: 2,
            }}
            disabled={!isFormValid}
          >
            SIGN UP
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
