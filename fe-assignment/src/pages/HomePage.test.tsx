import React, { ReactNode } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthContext } from '../context/AuthContext';
import HomePage from './HomePage';
import { CharacterDTO } from '../types/characterDTO';
import { useCharacters } from '../hooks/useCharacters';

jest.mock('../hooks/useCharacters');

const mockData: CharacterDTO[] = [
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
      name: 'Citadel of Ricks',
      url: 'https://rickandmortyapi.com/api/location/3',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  },
  {
    id: 2,
    name: 'Morty Smith',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    origin: { name: 'unknown', url: '' },
    location: { name: 'unknown', url: '' },
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
  },
];

interface MockAuthProviderProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

const MockAuthProvider: React.FC<MockAuthProviderProps> = ({ children }) => (
  <AuthContext.Provider
    value={{
      login: jest.fn(),
      logout: jest.fn(),
      user: { id: '1', username: 'testuser', role: 'admin' },
      isAuthenticated: true,
    }}
  >
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </AuthContext.Provider>
);

describe('HomePage integration test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders HomePage with mocked data and components', () => {
    (useCharacters as jest.Mock).mockReturnValue({
      allCharacters: mockData,
      fetchedData: [],
      allCharactersLoading: false,
      searchLoading: false,
      refetch: jest.fn(),
    });

    render(
      <MockAuthProvider>
        <HomePage />
      </MockAuthProvider>,
    );

    expect(screen.getByText('Home Page')).toBeInTheDocument();
    expect(screen.getByLabelText('Search Characters')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  test('logs out user when Logout button is clicked', async () => {
    const mockLogout = jest.fn();

    render(
      <AuthContext.Provider
        value={{
          login: jest.fn(),
          logout: mockLogout,
          user: { id: '1', username: 'testuser', role: 'admin' },
          isAuthenticated: true,
        }}
      >
        <QueryClientProvider client={queryClient}>
          <HomePage />
        </QueryClientProvider>
      </AuthContext.Provider>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Logout' }));
    expect(mockLogout).toHaveBeenCalled();
  });

  test('displays loading spinner while fetching characters', () => {
    (useCharacters as jest.Mock).mockReturnValue({
      allCharacters: [],
      fetchedData: [],
      allCharactersLoading: true,
      searchLoading: false,
      refetch: jest.fn(),
    });

    render(
      <MockAuthProvider>
        <HomePage />
      </MockAuthProvider>,
    );

    // Look for the CircularProgress component by its role
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('renders characters in DataGrid after loading', async () => {
    (useCharacters as jest.Mock).mockReturnValue({
      allCharacters: mockData,
      fetchedData: [],
      allCharactersLoading: false,
      searchLoading: false,
      refetch: jest.fn(),
    });

    render(
      <MockAuthProvider>
        <HomePage />
      </MockAuthProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
      expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    });
  });

  test('fetches and displays search results when search is performed', async () => {
    (useCharacters as jest.Mock).mockReturnValueOnce({
      allCharacters: [],
      fetchedData: mockData.filter((char) => char.name === 'Rick Sanchez'),
      allCharactersLoading: false,
      searchLoading: false,
      refetch: jest.fn(),
    });

    render(
      <MockAuthProvider>
        <HomePage />
      </MockAuthProvider>,
    );

    let rows = screen.getAllByRole('row');
    // Expect 3 rows: one for the header and two for the data
    expect(rows.length).toBeGreaterThan(2);

    fireEvent.change(screen.getByLabelText('Search Characters'), {
      target: { value: 'Rick' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));

    await waitFor(() => {
      // Check the number of rows in the grid after search
      rows = screen.getAllByRole('row');
      // Expect 2 rows: one for the header and one for the data
      expect(rows).toHaveLength(2);

      // Check that 'Rick Sanchez' is in the document
      const rickCells = screen
        .getAllByRole('gridcell')
        .filter((cell) => cell.textContent === 'Rick Sanchez');
      expect(rickCells).toHaveLength(1);
    });
  });
});
