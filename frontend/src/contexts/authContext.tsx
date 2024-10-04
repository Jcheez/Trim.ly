import React, { useState, createContext, ReactNode } from 'react';
import { authContextInterface } from '../interfaces';
import { refreshUserAccess } from '../adaptors/userAdaptor';
import { Navigate, Outlet } from 'react-router-dom';
import useFetchData from '../hooks/useFetchData';

export const AuthContext = createContext<authContextInterface>(
  {} as authContextInterface
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // States
  const [authState, setAuthState] = useState('');
  const [expiry, setExpiry] = useState(0);

  // Helper Functions
  const isAuthTokenValid = () => {
    return authState.length > 0 && Date.now() < expiry
  }

  const refreshAccessToken = async () => {
    return refreshUserAccess()
      .then((res) => {
        const responsePayload = res.data;
        setAuthState(responsePayload.data.accessToken);
        setExpiry(responsePayload.data.expiry)
        return responsePayload.data.accessToken
      })
      .catch((err) => {
        setAuthState('');
        setExpiry(0)
        return ''
      });
  };


  // Context Functions
  const getAccessToken = () => {
    if (isAuthTokenValid()) {
      return Promise.resolve(authState)
    }
    return refreshAccessToken()
  }

  const insertToken = (token: string) => {
    setAuthState(token)
  }

  const insertExpiry = (expiryTime: number) => {
    setExpiry(expiryTime)
  }

  const AuthenticatedRoutes = () => {
    const { loading } = useFetchData(getAccessToken)
    if (loading) {
      return <></>
    }
    return isAuthTokenValid() ? <Outlet /> : <Navigate to="/login" replace={true} />
  }

  const UnAuthenticatedRoutes = () => {
    const { loading } = useFetchData(getAccessToken)
    if (loading) {
      return <></>
    }
    return !isAuthTokenValid() ? <Outlet /> : <Navigate to="/main" replace={true} />;
  }

  return (
    <AuthContext.Provider value={{ getAccessToken, insertToken, insertExpiry, AuthenticatedRoutes, UnAuthenticatedRoutes }}>
      {children}
    </AuthContext.Provider>
  );
};
