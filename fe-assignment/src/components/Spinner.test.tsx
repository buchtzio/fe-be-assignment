import { render, screen } from '@testing-library/react';
import Spinner from './Spinner';

describe('Spinner', () => {
  it('renders the spinner component', () => {
    render(<Spinner />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('applies the correct styles to the Box component', () => {
    const { container } = render(<Spinner />);
    const box = container.querySelector('.MuiBox-root');
    expect(box).toHaveStyle('display: flex');
    expect(box).toHaveStyle('align-items: center');
    expect(box).toHaveStyle('justify-content: center');

    const styles = window.getComputedStyle(box as Element);
    expect(styles.margin).toBe('160px');
  });
});
