import React from 'react';
import { render, screen } from '@testing-library/react';
import { AuthContext, AuthContextType, User, useAuth } from './AuthContext';

const MockAuthProvider: React.FC<{
  children: React.ReactNode;
  user: User | null;
  isAuthenticated: boolean;
}> = ({ children, user, isAuthenticated }) => {
  const mockAuthContextValue: AuthContextType = {
    user: user,
    login: jest.fn(),
    logout: jest.fn(),
    isAuthenticated: isAuthenticated,
  };

  return (
    <AuthContext.Provider value={mockAuthContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

const TestComponent: React.FC = () => {
  const auth = useAuth();
  return (
    <div>
      <span>{auth.user?.username}</span>
      <span>{auth.isAuthenticated.toString()}</span>
    </div>
  );
};

describe('useAuth', () => {
  it('should return the correct context values', () => {
    const mockUser = { id: '1', username: 'testuser', role: 'admin' };

    render(
      <MockAuthProvider user={mockUser} isAuthenticated={true}>
        <TestComponent />
      </MockAuthProvider>,
    );

    expect(screen.getByText('testuser')).toBeInTheDocument();
    expect(screen.getByText('true')).toBeInTheDocument();
  });

  it('should throw an error if used outside of AuthProvider', () => {
    // Suppress the expected error message to avoid polluting test output
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const ErrorTestComponent = () => {
      useAuth(); // This should throw an error
      return null;
    };

    expect(() => render(<ErrorTestComponent />)).toThrow(
      'useAuth must be used within an AuthProvider',
    );

    spy.mockRestore();
  });
});

describe('AuthContext', () => {
  it('provides the correct context values to its children', () => {
    const mockUser = { id: '1', username: 'testuser', role: 'admin' };

    render(
      <MockAuthProvider user={mockUser} isAuthenticated={true}>
        <AuthContext.Consumer>
          {(value) => (
            <div>
              <span>{value?.user?.username}</span>
              <span>{value?.isAuthenticated.toString()}</span>
            </div>
          )}
        </AuthContext.Consumer>
      </MockAuthProvider>,
    );

    expect(screen.getByText('testuser')).toBeInTheDocument();
    expect(screen.getByText('true')).toBeInTheDocument();
  });
});
