import { render, screen } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

test('renders error message', () => {
  render(<ErrorMessage message="Invalid credentials" />);
  expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
});

test('does not render error message when message is empty', () => {
  render(<ErrorMessage message="" />);
  expect(screen.queryByText(/invalid credentials/i)).not.toBeInTheDocument();
});
