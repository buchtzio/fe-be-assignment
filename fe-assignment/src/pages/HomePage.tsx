import React, { useMemo, useState, useEffect } from 'react';
import { Container, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import DataGrid from '../components/DataGrid';
import { useCharacters } from '../hooks/useCharacters';
import { useCharacterState } from '../hooks/useCharacterState';
import { useHomeColumnDefs } from '../utils/homeColumnDefs';
import Spinner from '../components/Spinner';

const HomePage: React.FC = () => {
  const { user, logout } = useAuth();
  const [search, setSearch] = useState<string>('');
  const {
    allCharacters,
    fetchedData,
    allCharactersLoading,
    searchLoading,
    refetch,
  } = useCharacters(search);
  const { localData, selectedCharacter, handleEdit, handleInputChange } =
    useCharacterState(allCharacters, fetchedData);
  const columns = useHomeColumnDefs(user?.role === 'admin');

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      resizable: true,
      editable: false,
      minWidth: 100,
      flex: 1,
    }),
    [],
  );

  useEffect(() => {
    if (search) {
      refetch();
    }
  }, [search, refetch]);

  const handleSearchButtonClick = (searchValue: string) => {
    setSearch(searchValue);
  };

  return (
    <Container
      maxWidth={false}
      sx={{ maxWidth: '1280px' }}
      className="container"
      style={{ width: '100%' }}
    >
      <Header
        title="Home Page"
        showButton={true}
        buttonLabel="Logout"
        onButtonClick={logout}
      />
      <SearchBar
        selectedCharacter={selectedCharacter}
        allCharacters={allCharacters}
        onSearch={handleSearchButtonClick}
        onInputChange={(newValue) =>
          handleInputChange(null, newValue, allCharacters)
        }
      />
      <div className="ag-grid__wrapper">
        {allCharactersLoading || searchLoading ? (
          <Spinner />
        ) : (
          <Box className="grid-container" style={{ width: '100%' }}>
            <DataGrid
              data={localData}
              columns={columns}
              defaultColDef={defaultColDef}
              onEdit={handleEdit}
            />
          </Box>
        )}
      </div>
    </Container>
  );
};

export default HomePage;
