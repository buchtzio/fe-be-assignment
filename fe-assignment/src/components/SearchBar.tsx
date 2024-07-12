import React, { SyntheticEvent, useState } from 'react';
import { Box, Button } from '@mui/material';
import AutocompleteField from './AutocompleteField';
import { CharacterDTO } from '../types/characterDTO';

interface SearchBarProps {
  selectedCharacter: string | null;
  allCharacters: CharacterDTO[];
  onSearch: (searchValue: string) => void;
  onInputChange: (newValue: string | null) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  selectedCharacter,
  allCharacters,
  onSearch,
  onInputChange,
}) => {
  const [inputValue, setInputValue] = useState<string | null>(
    selectedCharacter,
  );

  const handleSearch = (event: React.MouseEvent) => {
    event.preventDefault();
    if (inputValue) {
      onSearch(inputValue);
    }
  };

  const handleInputChange = (
    event: SyntheticEvent<Element, Event> | null,
    newValue: string | null,
  ) => {
    setInputValue(newValue);
    onInputChange(newValue);
  };

  return (
    <Box mb={2} display="flex" alignItems="center" width="100%">
      <AutocompleteField
        label="Search Characters"
        value={inputValue}
        options={allCharacters.map((char: CharacterDTO) => char.name)}
        onChange={handleInputChange}
        style={{ width: '300px', maxWidth: '100%', marginBottom: 0 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        sx={{
          marginLeft: '10px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
