import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../@types/Movie';
import { FavoriteMovie } from '../@types/FavoriteMovie';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private readonly apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getFavorites(): Observable<Array<FavoriteMovie>> {
    return this.http.get<Array<FavoriteMovie>>(`${this.apiUrl}/favorites/`);
  }

  createFavoriteMovie(favoriteMovie: Pick<FavoriteMovie, 'movieId'>): Observable<FavoriteMovie> {
    return this.http.post<FavoriteMovie>(`${this.apiUrl}/favorites`, {
      ...favoriteMovie,
    });
  }

  deleteFavoriteMovie(id: string): Observable<FavoriteMovie> {
    return this.http.delete<FavoriteMovie>(`${this.apiUrl}/favorites/${id}`);
  }
  
}
