import React, { useState, createContext, ReactNode, useEffect } from 'react';
import { authContextInterface } from '../interfaces';
import { refreshUserAccess } from '../adaptors/userAdaptor';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';

export const AuthContext = createContext<authContextInterface>(
  {} as authContextInterface
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // States
  const [authState, setAuthState] = useState('');

  //hooks
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    getAccessToken()
  }, [])

  // Functions
  const hasAuthToken = () => {
    return authState.length > 0;
  };

  const getAccessToken = () => {
    if (!hasAuthToken()) {
      refreshUserAccess()
        .then((res) => {
          const responsePayload = res.data;
          setAuthState(responsePayload.data.accessToken);
        })
        .catch((err) => {
          console.log(`ERROR: ${err.response}`);
        });
      navigate(location.pathname, { replace: true })

    }
  };

  const AuthenticatedRoutes = () => {
    return hasAuthToken() ? <Outlet /> : <Navigate to="/login" replace={true} />
  }

  const UnAuthenticatedRoutes = () => {
    return !hasAuthToken() ? <Outlet /> : <Navigate to="/main" replace={true} />;
  }

  return (
    <AuthContext.Provider value={{ authState, setAuthState, AuthenticatedRoutes, UnAuthenticatedRoutes }}>
      {children}
    </AuthContext.Provider>
  );
};
