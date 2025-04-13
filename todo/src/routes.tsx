import { Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { AutenticateUserConfig } from './config/autenticateUserConfig';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <AutenticateUserConfig>
            <Dashboard />{' '}
          </AutenticateUserConfig>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
