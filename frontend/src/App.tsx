import { Route, Routes } from 'react-router-dom';
import './App.css';
import { useContext } from 'react';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import { AuthContext } from './contexts/authContext';
import LandingPage from './pages/LandingPage';
import NotFoundPage from './pages/NotFoundPage';
import WithNavBarLayout from './layouts/WithNavbarLayout';

function App() {
  const { AuthenticatedRoutes, UnAuthenticatedRoutes } = useContext(AuthContext);

  return (
    <div className="App">
        <Routes>
          <Route element={<AuthenticatedRoutes />}>
            <Route element={<WithNavBarLayout />}>
              <Route path="/main" element={<LandingPage />} />
              <Route path="/main2" element={<LandingPage />} />
            </Route>
          </Route>
          <Route element={<UnAuthenticatedRoutes />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
    </div>
  );
}

export default App;
