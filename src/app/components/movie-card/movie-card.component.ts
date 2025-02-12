import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Movie } from '../../@types/Movie';
import { DatePipe } from '@angular/common';
import { Language } from '../../@types/Language';

@Component({
  selector: 'movie-card',
  imports: [RouterLink, DatePipe],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent {
  
  @Input() movie!: Pick<Movie , "id" | "poster_path" | "title" | "release_date">; 
  @Input() lang!: Language;
}
