import { render, screen } from '@testing-library/react';
import ImageRenderer from './ImageRenderer';
import { CharacterDTO } from '../types/characterDTO';

const mockCharacter: CharacterDTO = {
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
};

describe('ImageRenderer', () => {
  it('renders the image with correct src and title attributes', () => {
    render(<ImageRenderer value={mockCharacter.image} data={mockCharacter} />);

    const imgElement = screen.getByRole('img');
    expect(imgElement).toHaveAttribute('src', mockCharacter.image);
    expect(imgElement).toHaveAttribute('title', mockCharacter.name);
  });

  it('applies correct styles to the image', () => {
    render(<ImageRenderer value={mockCharacter.image} data={mockCharacter} />);

    const imgElement = screen.getByRole('img');
    expect(imgElement).toHaveStyle({ width: '50px', height: '50px' });
  });
});
