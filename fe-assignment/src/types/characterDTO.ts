export interface customObj {
  name: string;
  url: string | '';
}

export interface CharacterDTO {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: customObj;
  location: customObj;
  image: string;
}
