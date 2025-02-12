import { Injectable } from '@angular/core';
import { Movie } from '../@types/Movie';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Credits } from '../@types/Credits';
import { MoviePaginationResponse } from '../@types/ListMovie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = 'https://api.themoviedb.org/3/movie';

  private defaultHeaders = {
    Authorization: 'Bearer ' + environment.apiKey,
  };

  constructor(private http: HttpClient) {}

  public getTopRatedMovies(
    language: string,
    page: number
  ): Observable<MoviePaginationResponse> {
    const params = new HttpParams().set('language', language).set('page', page);

    return this.http.get<MoviePaginationResponse>(`${this.apiUrl}/top_rated`, {
      params: params,
      headers: this.defaultHeaders,
    });
  }

  public getPopularMovies(
    language: string,
    page: number
  ): Observable<MoviePaginationResponse> {
    const params = new HttpParams().set('language', language).set('page', page);

    return this.http.get<MoviePaginationResponse>(`${this.apiUrl}/popular`, {
      params: params,
      headers: this.defaultHeaders,
    });
  }

  public getMovieDetailsById(id: number, language: string): Observable<Movie> {
    const params = new HttpParams().set('language', language);

    return this.http.get<Movie>(`${this.apiUrl}/${id}`, {
      params: params,
      headers: this.defaultHeaders,
    });
  }

  public getCreditsByMovieId(id: number, language: string): Observable<Credits> {
    const params = new HttpParams().set('language', language);

    return this.http.get<Credits>(`${this.apiUrl}/${id}/credits`, {
      params: params,
      headers: this.defaultHeaders,
    });
  }
}
