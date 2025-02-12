import { Cast } from './Cast';
import { Crew } from './Crew';

export type Credits = {
  id: number;
  cast: Cast[];
  crew: Crew[];
};
