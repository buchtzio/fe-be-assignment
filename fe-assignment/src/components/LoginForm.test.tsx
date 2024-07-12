import React, { ReactNode } from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginForm from './LoginForm';
import { AuthContext } from '../context/AuthContext';

const mockSetError = jest.fn();
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

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders login form and handles successful login', async () => {
    mockLogin.mockResolvedValue({});

    await act(async () => {
      render(
        <MemoryRouter>
          <MockAuthProvider>
            <LoginForm setError={mockSetError} />
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
      fireEvent.click(screen.getByText(/login/i));
    });

    expect(mockLogin).toHaveBeenCalledWith('testuser', 'password');
  });

  it('calls setError with the correct message on failed login', async () => {
    mockLogin.mockRejectedValue(new Error('Invalid credentials'));

    await act(async () => {
      render(
        <MemoryRouter>
          <MockAuthProvider>
            <LoginForm setError={mockSetError} />
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
      fireEvent.click(screen.getByText(/login/i));
    });

    await waitFor(() => {
      expect(mockSetError).toHaveBeenCalledWith('Invalid credentials');
    });
  });
});
