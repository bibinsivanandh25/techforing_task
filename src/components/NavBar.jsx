import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userData'); // Clear user data on logout
    navigate('/auth');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#002c6e' }}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 'bold',
          }}
        >
          Tech Foring
        </Typography>

        <Box>
          <Button
            component={Link}
            to="/jobs"
            color="inherit"
            sx={{ fontWeight: 'bold', mx: 1 }}
          >
            Jobs
          </Button>
          <Button
            component={Link}
            to="/auth"
            color="inherit"
            sx={{ fontWeight: 'bold', mx: 1 }}
          >
            Login
          </Button>
          <Button
            onClick={handleLogout}
            color="inherit"
            sx={{ fontWeight: 'bold', mx: 1 }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
