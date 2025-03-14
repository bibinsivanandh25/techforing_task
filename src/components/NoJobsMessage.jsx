import { Box, Typography } from '@mui/material';

const NoJobsMessage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        minHeight: '300px',
      }}
    >
      <Typography variant="h6" color="text.secondary" align="center">
        No jobs posted yet.
      </Typography>
    </Box>
  );
};

export default NoJobsMessage;
