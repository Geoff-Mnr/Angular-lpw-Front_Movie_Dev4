import { Director } from "./director.interface";

export interface Movie {
  id: number;
  director_id: number;
  director: Director;
  title: string;
  year: number;
  synopsis: string;
  created_at: Date;
  updated_at: Date;
}

export interface MovieWithCreator extends Movie {
  created_by: string;
}
