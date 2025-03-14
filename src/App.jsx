import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthForm from './pages/AuthForm';

import JobForm from './pages/JobForm';
import NavBar from './components/NavBar';
// import PrivateRoute from './components/PrivateRoute';

const AppWrapper = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/auth';

  return (
    <>
      {/* Conditionally render NavBar */}
      {!isAuthPage && <NavBar />}

      {/* Wrap routes inside Routes */}
      <Routes>
        {/* Public Route */}
        <Route path="/auth" element={<AuthForm />} />

        {/* Private Routes */}
        {/* <Route element={<PrivateRoute />}> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs" element={<JobForm />} />
        {/* </Route> */}

        {/* Redirect any unknown routes */}
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </>
  );
};

const App = () => (
  <Router>
    <AppWrapper />
  </Router>
);

export default App;
