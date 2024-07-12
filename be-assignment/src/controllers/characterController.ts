import { Request, Response } from 'express';
import axios from 'axios';
import config from 'config';
import { CharacterDTO } from '../types/characterDTO';

const apiUrl: string = config.get('RICK_AND_MORTY_API_URL');
const localCharacters: Partial<CharacterDTO>[] = [];

const fetchAllCharactersFromAPI = async (): Promise<CharacterDTO[]> => {
  const response = await axios.get(`${apiUrl}/character`);
  return response.data.results.map((character: CharacterDTO) => ({
    id: character.id,
    name: character.name,
    status: character.status,
    species: character.species,
    gender: character.gender,
    origin: character.origin,
    location: character.location,
    image: character.image,
  }));
};

export const getCharacters = async (req: Request, res: Response) => {  
  try {
    const characters = await fetchAllCharactersFromAPI();
    const mergedCharacters: CharacterDTO[] = characters.map((character) => {
      const localCharacter = localCharacters.find((c) => c.id === character.id);
      return localCharacter ? { ...character, ...localCharacter } : character;
    });

    res.json(mergedCharacters);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const serachByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;
    const characters = await fetchAllCharactersFromAPI();
    const mergedCharacters: CharacterDTO[] = characters.map((character) => {
      const localCharacter = localCharacters.find((c) => c.id === character.id);
      return localCharacter ? { ...character, ...localCharacter } : character;
    });

    const filteredCharacters = mergedCharacters.filter((character: CharacterDTO) =>
      character.name.toLowerCase().includes((name as string).toLowerCase())
    );

    res.json(filteredCharacters);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const updateCharacter = (req: Request, res: Response) => {
  const { id } = req.params;  
  const updatedData: Partial<CharacterDTO> = req.body;
  const existingCharacterIndex = localCharacters.findIndex((c) => c.id === parseInt(id));
  if (existingCharacterIndex !== -1) {
    localCharacters[existingCharacterIndex] = { ...localCharacters[existingCharacterIndex], ...updatedData };
  } else {
    localCharacters.push({ id: parseInt(id), ...updatedData });
  }

  res.json({ message: 'Character updated', character: localCharacters.find((c) => c.id === parseInt(id)) });
};

