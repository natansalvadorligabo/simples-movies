import { Component, signal } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { Movie } from '../../@types/Movie';
import { MovieService } from '../../services/movie.service';
import { CommonButtonComponent } from '../../components/common-button/common-button.component';
import { TranslateService } from '../../services/translate.service';
import { Language } from '../../@types/Language';
import { LanguageSelectorComponent } from '../../components/language-selector/language-selector.component';
import { TranslatePipe } from '@ngx-translate/core';
import { FavoriteService } from '../../services/favorite.service';
import { FavoriteMovie } from '../../@types/FavoriteMovie';

@Component({
  selector: 'app-movies',
  imports: [
    BreadcrumbComponent,
    SearchBarComponent,
    MovieCardComponent,
    CommonButtonComponent,
    LanguageSelectorComponent,
    TranslatePipe,
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
})
export class MoviesComponent {
  allMovies: Movie[] = [];
  displayedMovies: Movie[] = [];
  favoriteMoviesList: FavoriteMovie[] = [];
  currentPage: number = 1;
  selectedLanguage!: Language;

  favoriteStatus: string = '';

  constructor(
    private movieService: MovieService,
    private translateService: TranslateService,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit(): void {
    this.selectedLanguage = this.translateService.getCurrentLanguageValue();
    this.getCurrentLanguage();
    this.fetchFavoriteMovies();
  }

  private getCurrentLanguage(): void {
    this.translateService.getCurrentLanguage().subscribe({
      next: (res) => {
        this.selectedLanguage = res;
        this.allMovies = [];
        this.displayedMovies = [];
        this.fetchMovies();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  fetchMovies(): void {
    this.movieService
      .getTopRatedMovies(this.selectedLanguage.code, this.currentPage)
      .subscribe({
        next: ({ results }) => {
          this.allMovies = [...this.allMovies, ...results];
          this.displayedMovies = this.allMovies;
        },
        error: (err) => console.error(err),
      });
  }

  private fetchFavoriteMovies(): void {
    this.favoriteService.getFavorites().subscribe({
      next: (data) => {
        this.favoriteMoviesList = data;
        this.fetchMovies();
      },
      error: (err) => console.error(err),
    });
  }

  isMovieFavorite(movieId: number): boolean {
    return this.favoriteMoviesList.some(
      (favoriteMovie) => Number(favoriteMovie.movieId) === movieId
    );
  }

  toggleFavorite(movie: Movie) {
    if (this.isMovieFavorite(movie.id)) {
      const favorite = this.favoriteMoviesList.find(
        (fav) => fav.movieId === movie.id
      );
      if (favorite !== undefined) {
        this.favoriteService
          .deleteFavoriteMovie(String(favorite.id))
          .subscribe({
            next: () => {
              this.updateFavorites();
            },
            error: (err) => console.error(err),
          });
      }
    } else {
      this.favoriteService
        .createFavoriteMovie({ movieId: movie.id })
        .subscribe({
          next: () => {
            this.updateFavorites();
          },
          error: (err) => console.error(err),
        });
    }
  }

  private updateFavorites(): void {
    this.favoriteService.getFavorites().subscribe({
      next: (data) => {
        this.favoriteMoviesList = data;
      },
      error: (err) => console.error(err),
    });
  }

  filterMoviesByTitle(title: string): void {
    this.displayedMovies = this.allMovies.filter((movie) =>
      movie.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  loadMoreMovies(): void {
    this.currentPage++;
    this.fetchMovies();
  }
}
