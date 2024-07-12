import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import './App.css';

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {isAuthenticated ? (
          <Route path="/" element={<HomePage />} />
        ) : (
          <Route path="/" element={<Navigate to="/login" />} />
        )}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? '/' : '/login'} />}
        />
      </Routes>
    </div>
  );
};

export default App;
