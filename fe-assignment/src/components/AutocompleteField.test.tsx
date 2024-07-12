import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AutocompleteField from './AutocompleteField';

describe('AutocompleteField', () => {
  const mockOnChange = jest.fn();
  const options = ['Option 1', 'Option 2', 'Option 3'];

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  test('renders the component with the provided label', () => {
    render(
      <AutocompleteField
        label="Test Label"
        value={null}
        options={options}
        onChange={mockOnChange}
        style={{}}
      />,
    );

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  test('displays options when typing', () => {
    render(
      <AutocompleteField
        label="Test Label"
        value={null}
        options={options}
        onChange={mockOnChange}
        style={{}}
      />,
    );

    const input = screen.getByLabelText('Test Label') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Option' } });

    options.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  test('calls onChange with the new value when an option is selected', () => {
    render(
      <AutocompleteField
        label="Test Label"
        value={null}
        options={options}
        onChange={mockOnChange}
        style={{}}
      />,
    );

    const input = screen.getByLabelText('Test Label') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Option 1' } });

    const option = screen.getByText('Option 1');
    fireEvent.click(option);

    expect(mockOnChange).toHaveBeenCalledWith(null, 'Option 1');
  });

  test('calls onChange with null when input value is cleared', () => {
    render(
      <AutocompleteField
        label="Test Label"
        value="Option 1"
        options={options}
        onChange={mockOnChange}
        style={{}}
      />,
    );

    const input = screen.getByLabelText('Test Label') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '' } });

    expect(mockOnChange).toHaveBeenCalledWith(null, '');
  });
});
