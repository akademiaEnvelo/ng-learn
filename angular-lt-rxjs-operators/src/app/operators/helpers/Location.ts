export interface Location {
  id: number;
  name: string;
  residents: string[]; // urls
  type: 'Planet' | 'Space station';
  dimension: string;
}
