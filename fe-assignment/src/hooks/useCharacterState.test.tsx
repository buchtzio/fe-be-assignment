import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { useCharacterState } from './useCharacterState';
import { CharacterDTO } from '../types/characterDTO';
import api from '../api';

jest.mock('../api');

const mockCharacters: CharacterDTO[] = [
  {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    origin: {
      name: 'Earth (C-137)',
      url: 'https://rickandmortyapi.com/api/location/1',
    },
    location: {
      name: 'Earth (Replacement Dimension)',
      url: 'https://rickandmortyapi.com/api/location/20',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  },
];

const TestComponent: React.FC = () => {
  const { localData, handleEdit, handleSearch, handleInputChange } =
    useCharacterState(mockCharacters, []);

  return (
    <div>
      <div>
        Local Data:
        {localData.map((char) => (
          <div key={char.id} data-testid={`character-${char.id}`}>
            {char.name}
          </div>
        ))}
      </div>
      <button
        onClick={(event) =>
          handleSearch(event as React.MouseEvent<HTMLButtonElement>, jest.fn())
        }
      >
        Simulate Search
      </button>
      <input
        onChange={(e) => handleInputChange(e, e.target.value, mockCharacters)}
      />
      <button onClick={() => handleEdit(1, 'status', 'Dead')}>
        Simulate Edit
      </button>
    </div>
  );
};

describe('useCharacterState hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('handles edit correctly', async () => {
    render(<TestComponent />);

    fireEvent.click(screen.getByText('Simulate Edit'));

    await waitFor(() => {
      expect(api.put).toHaveBeenCalledTimes(1);
      expect(api.put).toHaveBeenCalledWith(
        '/characters/1',
        { status: 'Dead' },
        expect.any(Object),
      );
    });
  });

  it('handles search correctly', async () => {
    render(<TestComponent />);

    fireEvent.click(screen.getByText('Simulate Search'));

    await waitFor(() => {
      expect(screen.getByText('Local Data:')).toBeInTheDocument();
    });
  });

  it('handles input change correctly', async () => {
    render(<TestComponent />);

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Rick' },
    });

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });
  });
});
