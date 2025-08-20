// types.ts
export interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string;
  rating: number;
  duration: string;
  downloadLink: string;
  description: string;
}

export interface MovieFormState {
  title: string;
  year: string;
  genre: string;
  rating: string;
  duration: string;
  downloadLink: string;
  description: string;
}