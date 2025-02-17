import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../@types/Review';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private readonly apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getReviewsByMovie(movieId: number): Observable<Array<Review>> {
    return this.http.get<Array<Review>>(
      `${this.apiUrl}/reviews?movieId=${movieId}`
    );
  }

  createMovieReview(
    review: Omit<Review, 'id' | 'reviewDate'>
  ): Observable<Review> {
    const reviewDate = new Date().toISOString();

    return this.http.post<Review>(`${this.apiUrl}/reviews`, {
      ...review,
      reviewDate,
    });
  }
}
