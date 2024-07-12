import { useState, useEffect, SyntheticEvent } from 'react';
import { CharacterDTO } from '../types/characterDTO';
import api from '../api';

const updateCharacter = async (id: number, field: string, value: string) => {
  const response = await api.put(
    `/characters/${id}`,
    { [field]: value },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    },
  );
  return response?.data;
};

export const useCharacterState = (
  allCharacters: CharacterDTO[],
  fetchedData: CharacterDTO[],
) => {
  const [localData, setLocalData] = useState<CharacterDTO[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(
    null,
  );
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    if (allCharacters.length > 0) {
      setLocalData(allCharacters);
    }
  }, [allCharacters]);

  useEffect(() => {
    if (fetchedData.length > 0) {
      setLocalData(fetchedData);
    }
  }, [fetchedData]);

  const handleEdit = async (id: number, field: string, value: string) => {
    try {
      await updateCharacter(id, field, value);
      setLocalData((prev) =>
        prev.map((char) =>
          char.id === id ? { ...char, [field]: value } : char,
        ),
      );
    } catch (error) {
      console.error('Failed to update character', error);
    }
  };

  const handleSearch = (event: React.MouseEvent, refetch: () => void) => {
    event.preventDefault();
    if (selectedCharacter) {
      setSearch(selectedCharacter);
      refetch();
    }
  };

  const handleInputChange = (
    event: SyntheticEvent<Element, Event> | null,
    newValue: string | null,
    allCharacters: CharacterDTO[],
  ) => {
    setSelectedCharacter(newValue);
    if (newValue) {
      const filteredData = allCharacters.filter((char) =>
        char.name.toLowerCase().includes(newValue.toLowerCase()),
      );
      setLocalData(filteredData);
    } else {
      setLocalData(allCharacters);
    }
  };

  return {
    localData,
    search,
    selectedCharacter,
    handleEdit,
    handleSearch,
    handleInputChange,
  };
};
