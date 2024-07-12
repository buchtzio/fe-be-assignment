import { render, screen } from '@testing-library/react';
import NoRowsOverlay from './NoRowsOverlay';

describe('NoRowsOverlay', () => {
  it('renders the no data available message', () => {
    render(<NoRowsOverlay />);

    expect(screen.getByText('No Data Available')).toBeInTheDocument();
  });

  it('applies correct styles to the container', () => {
    render(<NoRowsOverlay />);

    const divElement = screen.getByText('No Data Available').closest('div');
    expect(divElement).toHaveStyle({ textAlign: 'center', padding: '20px' });
  });
});
