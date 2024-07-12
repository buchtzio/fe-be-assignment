import { render, screen, fireEvent } from '@testing-library/react';
import ObjectRenderer from './ObjectRenderer';
import { customObj } from '../types/characterDTO';

const mockValueWithUrl: customObj = {
  name: 'Test Name',
  url: 'http://example.com',
};

const mockValueWithoutUrl: customObj = {
  name: 'Test Name',
  url: '',
};

describe('ObjectRenderer', () => {
  it('renders "Unknown" if value is null or does not have a name', () => {
    render(<ObjectRenderer value={null} />);
    expect(screen.getByText('Unknown')).toBeInTheDocument();
  });

  it('renders name if value is provided without url', () => {
    render(<ObjectRenderer value={mockValueWithoutUrl} />);
    expect(screen.getByText(mockValueWithoutUrl.name)).toBeInTheDocument();
  });

  it('renders tooltip with name and link if value has url', async () => {
    render(<ObjectRenderer value={mockValueWithUrl} />);

    // Ensure the tooltip is not visible initially
    expect(screen.queryByText(mockValueWithUrl.name)).not.toBeInTheDocument();
    expect(screen.queryByText(mockValueWithUrl.url)).not.toBeInTheDocument();

    // Hover over the element to trigger the tooltip
    fireEvent.mouseOver(screen.getByText('Hover for details'));

    // Wait for the tooltip to appear
    expect(await screen.findByText(mockValueWithUrl.name)).toBeInTheDocument();
    expect(await screen.findByText(mockValueWithUrl.url)).toBeInTheDocument();
  });

  it('applies correct cursor style', () => {
    render(<ObjectRenderer value={mockValueWithUrl} />);
    const hoverElement = screen.getByText('Hover for details');
    expect(hoverElement).toHaveStyle('cursor: help');
  });
});
