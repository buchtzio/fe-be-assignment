import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';
import { CharacterDTO } from '../types/characterDTO';

const mockCharacters: CharacterDTO[] = [
  {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    origin: { name: 'Earth (C-137)', url: '' },
    location: { name: 'Citadel of Ricks', url: '' },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  },
  {
    id: 2,
    name: 'Morty Smith',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    origin: { name: 'Earth (C-137)', url: '' },
    location: { name: 'Citadel of Ricks', url: '' },
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
  },
];

describe('SearchBar', () => {
  const mockOnSearch = jest.fn();
  const mockOnInputChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the SearchBar component', () => {
    render(
      <SearchBar
        selectedCharacter={null}
        allCharacters={mockCharacters}
        onSearch={mockOnSearch}
        onInputChange={mockOnInputChange}
      />,
    );

    expect(screen.getByLabelText(/search characters/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('calls onSearch with the input value when search button is clicked', () => {
    render(
      <SearchBar
        selectedCharacter={null}
        allCharacters={mockCharacters}
        onSearch={mockOnSearch}
        onInputChange={mockOnInputChange}
      />,
    );

    fireEvent.change(screen.getByLabelText(/search characters/i), {
      target: { value: 'Rick Sanchez' },
    });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    expect(mockOnSearch).toHaveBeenCalledWith('Rick Sanchez');
  });

  it('calls onInputChange when the input value changes', () => {
    render(
      <SearchBar
        selectedCharacter={null}
        allCharacters={mockCharacters}
        onSearch={mockOnSearch}
        onInputChange={mockOnInputChange}
      />,
    );

    fireEvent.change(screen.getByLabelText(/search characters/i), {
      target: { value: 'Morty Smith' },
    });

    expect(mockOnInputChange).toHaveBeenCalledWith('Morty Smith');
  });

  it('does not call onSearch if input value is empty', () => {
    render(
      <SearchBar
        selectedCharacter={null}
        allCharacters={mockCharacters}
        onSearch={mockOnSearch}
        onInputChange={mockOnInputChange}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    expect(mockOnSearch).not.toHaveBeenCalled();
  });

  it('sets the initial input value based on selectedCharacter prop', () => {
    render(
      <SearchBar
        selectedCharacter="Rick Sanchez"
        allCharacters={mockCharacters}
        onSearch={mockOnSearch}
        onInputChange={mockOnInputChange}
      />,
    );

    expect(screen.getByLabelText(/search characters/i)).toHaveValue(
      'Rick Sanchez',
    );
  });
});
