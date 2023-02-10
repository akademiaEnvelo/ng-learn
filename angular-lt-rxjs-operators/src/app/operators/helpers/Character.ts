export interface Character {
  name: string;
  id: number;
  status: 'Alive' | 'Dead';
  image: string;
  location: {
    name: string;
    id: string;
    url: string;
  };
}
