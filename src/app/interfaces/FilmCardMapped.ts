import { BelongsToCollection } from './FilmCardRaw';
import { Genre } from './FilmDetailsRaw';

export interface FilmCardMapped {
  id: number;
  backdrop_path: string;
  belongsToCollection: BelongsToCollection;
  budget: number;
  genres: Genre[];
  originalCountry: string[];
  originalTitle: string;
  overview: string;
  posterPath: string;
  releaseDate: Date;
  runtime: number;
  status: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
