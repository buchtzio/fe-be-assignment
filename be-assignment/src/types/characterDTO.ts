export interface Origin {
    name: string;
    url: string;
}
  
export interface Location {
    name: string;
    url: string;
}
export interface CharacterDTO {
    id: number;
    name: string;
    status: string;
    species: string;
    gender: string;
    origin: Origin;
    location: Location;
    image: string;
}
  