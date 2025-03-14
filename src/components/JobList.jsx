import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  CardActions,
  Button,
} from '@mui/material';
import NoJobsMessage from './NoJobsMessage';
import { useNavigate } from 'react-router-dom';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem('jobs')) || [];
    setJobs(savedJobs);
  }, []);

  const handleDelete = (id) => {
    const updatedJobs = jobs.filter((job) => job.id !== id);
    setJobs(updatedJobs);
    localStorage.setItem('jobs', JSON.stringify(updatedJobs)); // Sync to localStorage
  };

  const handleEdit = (job) => {
    navigate('/jobs', {
      state: { job },
    });
  };

  return (
    <Box
      sx={{
        py: 3,
        px: 4,
      }}
    >
      <Typography variant="h6" sx={{ mb: 4 }}>
        Available Jobs
      </Typography>
      <Grid container spacing={2}>
        {jobs.length === 0 ? (
          <NoJobsMessage />
        ) : (
          jobs.map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job.id}>
              <Card
                sx={{
                  height: '100%',
                  width: '100%',
                  maxWidth: 500,
                  boxShadow: 3,
                  borderRadius: 3,
                  p: 1,
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      lineHeight: 1.3,
                    }}
                  >
                    {job.title}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    {job.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    sx={{
                      borderRadius: 20,
                      backgroundColor: '#002c6e',
                      px: 3,
                      py: 1,
                      fontWeight: 500,
                    }}
                    onClick={() => handleEdit(job)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    sx={{
                      borderRadius: 20,
                      backgroundColor: ' red',
                      color: 'white',
                      px: 3,
                      py: 1,
                      fontWeight: 500,
                    }}
                    onClick={() => handleDelete(job.id)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default JobList;
