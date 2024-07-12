import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import AuthProvider from './AuthProvider';
import { AuthContext } from './AuthContext';
import api from '../api';
import { getToken, fetchUserInfo } from '../utils/auth';

jest.mock('../api');
jest.mock('../utils/auth');

const mockToken = 'mock-token';
const mockUser = { id: '1', username: 'testuser', role: 'admin' };

describe('AuthProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const TestComponent = () => {
    const { user, login, logout, isAuthenticated } =
      React.useContext(AuthContext)!;
    return (
      <div>
        <span>{user?.username || 'No user'}</span>
        <span>{isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</span>
        <button onClick={() => login('testuser', 'password')}>Login</button>
        <button onClick={logout}>Logout</button>
      </div>
    );
  };

  it('handles login and updates user state', async () => {
    (getToken as jest.Mock).mockReturnValue(null);
    (api.post as jest.Mock).mockResolvedValue({ data: { token: mockToken } });
    (fetchUserInfo as jest.Mock).mockResolvedValue(mockUser);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    await waitFor(() =>
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument(),
    );

    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => expect(fetchUserInfo).toHaveBeenCalledWith(mockToken));
    await waitFor(() =>
      expect(screen.getByText('testuser')).toBeInTheDocument(),
    );
    expect(screen.getByText('Authenticated')).toBeInTheDocument();
  });

  it('handles logout and updates user state', async () => {
    (getToken as jest.Mock).mockReturnValue(mockToken);
    (fetchUserInfo as jest.Mock).mockResolvedValue(mockUser);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    await waitFor(() => expect(fetchUserInfo).toHaveBeenCalledWith(mockToken));
    await waitFor(() =>
      expect(screen.getByText('testuser')).toBeInTheDocument(),
    );
    expect(screen.getByText('Authenticated')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Logout'));

    await waitFor(() =>
      expect(screen.getByText('No user')).toBeInTheDocument(),
    );
    expect(screen.getByText('Not Authenticated')).toBeInTheDocument();
  });

  it('handles fetch user info on initial load', async () => {
    (getToken as jest.Mock).mockReturnValue(mockToken);
    (fetchUserInfo as jest.Mock).mockResolvedValue(mockUser);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    await waitFor(() => expect(fetchUserInfo).toHaveBeenCalledWith(mockToken));
    await waitFor(() =>
      expect(screen.getByText('testuser')).toBeInTheDocument(),
    );
    expect(screen.getByText('Authenticated')).toBeInTheDocument();
  });

  it('handles fetch user info failure', async () => {
    (getToken as jest.Mock).mockReturnValue(mockToken);
    (fetchUserInfo as jest.Mock).mockRejectedValue(new Error('Fetch failed'));

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    await waitFor(() => expect(fetchUserInfo).toHaveBeenCalledWith(mockToken));
    await waitFor(() =>
      expect(screen.getByText('No user')).toBeInTheDocument(),
    );
    expect(screen.getByText('Not Authenticated')).toBeInTheDocument();
  });
});
