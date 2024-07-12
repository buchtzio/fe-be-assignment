import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getToken, fetchUserInfo } from '../utils/auth';
import { AuthContext, User } from './AuthContext';
import api from '../api';
import Spinner from '../components/Spinner';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const isFetching = useRef(false);
  const initialFetchDone = useRef(false);

  const handleFetchUserInfo = useCallback(async (token: string) => {
    if (isFetching.current) return;
    isFetching.current = true;
    try {
      const userData = await fetchUserInfo(token);
      setUser(userData);
    } catch (error) {
      logout();
    } finally {
      setLoading((prevLoading) => {
        if (prevLoading) {
          return false;
        }
        return prevLoading;
      });
      isFetching.current = false;
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { username, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      await handleFetchUserInfo(token);
    } catch (error) {
      console.error('Login failed', error);
      throw new Error('Invalid username or password');
    }
  };

  const logout = () => {
    console.log('Logging out...');
    setUser(null);
    localStorage.removeItem('token');
  };

  const isAuthenticated = !!user;

  useEffect(() => {
    if (initialFetchDone.current) return;
    initialFetchDone.current = true;
    const token = getToken();
    if (token) {
      handleFetchUserInfo(token);
    } else {
      setLoading(false);
    }
  }, [handleFetchUserInfo]);

  return loading ? (
    <>
      <Spinner />
    </>
  ) : (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
