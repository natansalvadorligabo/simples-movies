import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Movie } from '../../@types/Movie';
import { DatePipe } from '@angular/common';
import { Language } from '../../@types/Language';

@Component({
  selector: 'movie-card',
  imports: [RouterLink, DatePipe],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  @Input() movie!: Movie;
  @Input() isFavorite: boolean = false;
  isLoading: boolean = false;
  @Input() lang!: Language;
  @Output() notifyMovie = new EventEmitter<Movie>();

  sendMovie(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isFavorite = this.isFavorite ? false : true;
      this.isLoading = false; 
      this.notifyMovie.emit(this.movie);
    }, 1000);
  }
}
