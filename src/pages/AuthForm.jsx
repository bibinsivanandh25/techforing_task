import { Box, Paper, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';

const AuthForm = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (e, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#e5e7eb',
        pt: 6,
        pb: 4,
        overflowY: 'auto',
      }}
    >
      <Box>
        <Typography
          variant="h4"
          align="center"
          sx={{ fontWeight: 'bold', color: 'green', mb: 2 }}
        >
          Tech<span style={{ color: '#2e2e2e' }}> F</span>oring
        </Typography>
        <Typography align="center" sx={{ mb: 3 }}>
          Shaping Tomorrow's Cybersecurity
        </Typography>
      </Box>

      <Paper
        elevation={3}
        sx={{ borderRadius: 2, width: 500, overflow: 'hidden' }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            mb: 2,
            backgroundColor: '#a7afb6',
          }}
          textColor="#ffffff"
        >
          <Tab
            label="SIGN IN"
            sx={{
              color: '#ffffff',
              backgroundColor: tabValue === 0 ? '#5bbc2e' : 'inherit',
              fontWeight: 'bold',
              fontSize: 16,
            }}
          />
          <Tab
            label="SIGN UP"
            sx={{
              color: '#ffffff',
              backgroundColor: tabValue === 1 ? '#5bbc2e' : 'inherit',
              fontWeight: 'bold',
              fontSize: 16,
            }}
          />
        </Tabs>

        {tabValue === 0 ? (
          <Login />
        ) : (
          <Register onRegisterSuccess={() => setTabValue(0)} />
        )}
      </Paper>
    </Box>
  );
};

export default AuthForm;
