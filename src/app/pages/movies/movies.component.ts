import { Component, signal } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { Movie } from '../../@types/Movie';
import { MovieService } from '../../services/movie.service';
import { CommonButtonComponent } from '../../components/common-button/common-button.component';
import { TranslateService } from '../../services/translate.service';
import { Language } from '../../@types/Language';
import { LanguageSelectorComponent } from "../../components/language-selector/language-selector.component";
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-movies',
  imports: [
    BreadcrumbComponent,
    SearchBarComponent,
    MovieCardComponent,
    CommonButtonComponent,
    LanguageSelectorComponent,
    TranslatePipe
],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
})
export class MoviesComponent {
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  page: number = 1;
  language!: Language;

  constructor(
    private movieService: MovieService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.language = this.translateService.getCurrentLanguageValue();
    this.fetchMovies();
    this.getCurrentLanguage();
  }

  private getCurrentLanguage(): void {
    this.translateService.getCurrentLanguage().subscribe({
      next: (res) => {
        this.language = res;
        this.movies = [];
        this.filteredMovies = [];
        this.fetchMovies();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  
  private fetchMovies(): void {
    this.movieService.getTopRatedMovies(this.language.code, this.page).subscribe({
      next: ({ results }) => {
        this.movies = [...this.movies, ...results];
        this.filteredMovies = this.movies;
      },
      error: (err) => console.error(err),
    });
  }

  filterMoviesByTitle(title: string): void {
    this.filteredMovies = this.movies.filter((movie) =>
      movie.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  loadMoreMovies(): void {
    this.page++;
    this.fetchMovies();
  }
}
