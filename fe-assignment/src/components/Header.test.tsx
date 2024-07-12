import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('renders the title', () => {
    render(<Header title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders the button when showButton is true', () => {
    render(
      <Header title="Test Title" showButton={true} buttonLabel="Click Me" />,
    );
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('does not render the button when showButton is false', () => {
    render(<Header title="Test Title" showButton={false} />);
    expect(screen.queryByText('Click Me')).not.toBeInTheDocument();
  });

  it('calls the onButtonClick handler when button is clicked', () => {
    const mockOnButtonClick = jest.fn();
    render(
      <Header
        title="Test Title"
        showButton={true}
        buttonLabel="Click Me"
        onButtonClick={mockOnButtonClick}
      />,
    );

    fireEvent.click(screen.getByText('Click Me'));
    expect(mockOnButtonClick).toHaveBeenCalledTimes(1);
  });
});
