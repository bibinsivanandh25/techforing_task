import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const JobForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const job = location.state?.job;
  const [form, setForm] = useState({
    title: job?.title || '',
    description: job?.description || '',
  });

  const { title, description } = form;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let jobs = JSON.parse(localStorage.getItem('jobs')) || [];

    if (job) {
      jobs = jobs.map((j) =>
        j.id === job.id ? { ...j, title, description } : j
      );
    } else {
      const newJob = { id: Date.now(), title, description };
      jobs.push(newJob);
    }

    localStorage.setItem('jobs', JSON.stringify(jobs));

    navigate('/');

    setForm({ title: '', description: '' });
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pt: 10,
        minHeight: '100vh',
        backgroundColor: '#edebeb',
      }}
    >
      <Paper elevation={3} sx={{ p: 3, mb: 4, width: 600 }}>
        <Typography gutterBottom variant="h6">
          {job ? 'Edit Job' : ' Create a New Job'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Title"
            name="title"
            required
            margin="normal"
            value={title}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Description"
            name="description"
            required
            margin="normal"
            multiline
            value={description}
            onChange={handleChange}
            minRows={3}
            fullWidth
          />
          <Button
            variant="contained"
            type="submit"
            fullWidth
            color="primary"
            sx={{
              mt: 2,
              py: 2,
              backgroundColor: '#002c6e',
            }}
          >
            {job ? 'Update Job' : 'Post Job'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default JobForm;
