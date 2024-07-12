import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCharacters } from './useCharacters';
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

const queryClient = new QueryClient();

const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const TestComponent: React.FC<{ search: string }> = ({ search }) => {
  const { allCharacters, fetchedData, allCharactersLoading, searchLoading } =
    useCharacters(search);

  if (allCharactersLoading || searchLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>All Characters:</div>
      {allCharacters.map((char) => (
        <div key={char.id} data-testid={`character-${char.id}`}>
          {char.name}
        </div>
      ))}

      <div>Fetched Data:</div>
      {fetchedData.map((char) => (
        <div key={char.id}>{char.name}</div>
      ))}
    </div>
  );
};

describe('useCharacters', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches all characters initially', async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({ data: mockCharacters });

    const { getByText, findByText } = render(<TestComponent search="" />, {
      wrapper,
    });

    await findByText('Rick Sanchez');
    expect(getByText('All Characters:')).toBeInTheDocument();
    expect(getByText('Fetched Data:')).toBeInTheDocument();
  });

  it('fetches characters by search term', async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({ data: mockCharacters });

    const { findByTestId, getByText } = render(
      <TestComponent search="Rick" />,
      { wrapper },
    );
    const rickElement = await findByTestId('character-1');

    expect(rickElement).toBeInTheDocument();
    expect(getByText('All Characters:')).toBeInTheDocument();
    expect(getByText('Fetched Data:')).toBeInTheDocument();
  });

  it('handles fetch characters failure', async () => {
    (api.get as jest.Mock).mockRejectedValueOnce(new Error('Fetch failed'));

    const { getByText } = render(<TestComponent search="" />, { wrapper });

    await waitFor(() => {
      expect(getByText('All Characters:')).toBeInTheDocument();
    });
    expect(getByText('Fetched Data:')).toBeInTheDocument();
  });

  it('handles fetch characters by search term failure', async () => {
    (api.get as jest.Mock).mockRejectedValueOnce(new Error('Fetch failed'));

    const { getByText } = render(<TestComponent search="Rick" />, { wrapper });

    await waitFor(() => {
      expect(getByText('All Characters:')).toBeInTheDocument();
    });
    expect(getByText('Fetched Data:')).toBeInTheDocument();
  });
});
