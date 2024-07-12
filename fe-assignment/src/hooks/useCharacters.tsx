import { useQuery } from '@tanstack/react-query';
import { CharacterDTO } from '../types/characterDTO';
import api from '../api';

const fetchCharacters = async (): Promise<CharacterDTO[]> => {
  const { data } = await api.get(`/characters`);
  return data;
};

const fetchCharacterByName = async (name: string): Promise<CharacterDTO[]> => {
  const { data } = await api.get(`/characters/search?name=${name}`);
  return data;
};

export const useCharacters = (search: string) => {
  const allCharactersQuery = useQuery<CharacterDTO[], Error>({
    queryKey: ['allCharacters'],
    queryFn: fetchCharacters,
    staleTime: 1000 * 60 * 10,
  });

  const searchCharactersQuery = useQuery<CharacterDTO[], Error>({
    queryKey: ['characters', search],
    queryFn: () => fetchCharacterByName(search),
    enabled: search.length > 0, // Only run this query if there is a search term
    staleTime: 1000 * 60 * 1,
  });

  return {
    allCharacters: allCharactersQuery.data ?? [],
    fetchedData: searchCharactersQuery.data ?? [],
    allCharactersLoading: allCharactersQuery.isLoading,
    searchLoading: searchCharactersQuery.isLoading,
    refetch: searchCharactersQuery.refetch,
  };
};
