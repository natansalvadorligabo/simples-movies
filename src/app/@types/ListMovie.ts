import { Movie } from './Movie';

export type MoviePaginationResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};
