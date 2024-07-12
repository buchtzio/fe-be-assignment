import React, { ReactNode } from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import { AuthContext } from '../context/AuthContext';

const mockLogin = jest.fn();

interface MockAuthProviderProps {
  children: ReactNode;
}

const MockAuthProvider: React.FC<MockAuthProviderProps> = ({ children }) => (
  <AuthContext.Provider
    value={{
      login: mockLogin,
      logout: jest.fn(),
      user: null,
      isAuthenticated: false,
    }}
  >
    {children}
  </AuthContext.Provider>
);

describe('LoginPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders login page with form and handles successful login', async () => {
    mockLogin.mockResolvedValue({});

    await act(async () => {
      render(
        <MemoryRouter>
          <MockAuthProvider>
            <LoginPage />
          </MockAuthProvider>
        </MemoryRouter>,
      );
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/username/i), {
        target: { value: 'testuser' },
      });
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: 'password' },
      });

      // Use getByRole to select the button
      fireEvent.click(screen.getByRole('button', { name: /login/i }));
    });

    expect(mockLogin).toHaveBeenCalledWith('testuser', 'password');
  });

  it('displays error message on failed login', async () => {
    mockLogin.mockRejectedValue(new Error('Invalid credentials'));

    await act(async () => {
      render(
        <MemoryRouter>
          <MockAuthProvider>
            <LoginPage />
          </MockAuthProvider>
        </MemoryRouter>,
      );
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/username/i), {
        target: { value: 'testuser' },
      });
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: 'password' },
      });

      // Use getByRole to select the button
      fireEvent.click(screen.getByRole('button', { name: /login/i }));
    });

    expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument();
  });
});
