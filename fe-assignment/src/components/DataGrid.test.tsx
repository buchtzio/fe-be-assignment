import { render, screen, within } from '@testing-library/react';
import DataGrid from './DataGrid';
import { ColDef } from 'ag-grid-community';
import { CharacterDTO } from '../types/characterDTO';

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

const mockColumns: ColDef[] = [
  { headerName: 'ID', field: 'id' },
  { headerName: 'Name', field: 'name', editable: true },
  { headerName: 'Status', field: 'status', editable: true },
  { headerName: 'Species', field: 'species', editable: true },
  { headerName: 'Gender', field: 'gender', editable: true },
  { headerName: 'Origin', field: 'origin', editable: false },
  { headerName: 'Location', field: 'location', editable: false },
  { headerName: 'Image', field: 'image', editable: false },
];

const mockDefaultColDef: ColDef = {
  sortable: true,
  filter: true,
};

// Suppress the AG Grid warning
jest.spyOn(console, 'warn').mockImplementation((message) => {
  if (
    message.includes(
      'AG Grid: Cell data type is "object" but no value formatter has been provided',
    )
  ) {
    return;
  }
  console.warn(message);
});

describe('DataGrid', () => {
  it('renders the data grid with the provided data and columns', () => {
    render(
      <DataGrid
        data={mockData}
        columns={mockColumns}
        defaultColDef={mockDefaultColDef}
        onEdit={jest.fn()}
      />,
    );

    // Validate rows by specific columns
    const rows = screen.getAllByRole('row');

    // Row for Rick Sanchez
    const row1 = rows.find((row) => within(row).queryByText('Rick Sanchez'));
    expect(row1).toBeDefined();
    expect(within(row1!).getByText('Alive')).toBeInTheDocument();
    expect(within(row1!).getByText('Human')).toBeInTheDocument();
    expect(within(row1!).getByText('Male')).toBeInTheDocument();
    expect(within(row1!).getAllByText('Hover for details')).toHaveLength(2);

    // Row for Morty  Smith
    const row2 = rows.find((row) => within(row).queryByText('Morty Smith'));
    expect(row2).toBeDefined();
    expect(within(row2!).getByText('Alive')).toBeInTheDocument();
    expect(within(row2!).getByText('Human')).toBeInTheDocument();
    expect(within(row2!).getByText('Male')).toBeInTheDocument();
    expect(within(row2!).getAllByText('unknown')).toHaveLength(2);
  });
});
