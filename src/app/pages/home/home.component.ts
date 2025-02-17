import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TranslatePipe } from '@ngx-translate/core';
import { CommonButtonComponent } from '../../components/common-button/common-button.component';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { FavoriteService } from '../../services/favorite.service';
import { TranslateService } from '../../services/translate.service';
import { LanguageSelectorComponent } from '../../components/language-selector/language-selector.component';
import { FavoriteMovie } from '../../@types/FavoriteMovie';
import { Movie } from '../../@types/Movie';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-home',
  imports: [
    BreadcrumbComponent,
    TranslatePipe,
    CommonButtonComponent,
    MovieCardComponent,
    LanguageSelectorComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  userFavoriteMovies: FavoriteMovie[] = [];
  moviesList: Movie[] = [];
  selectedLanguage = { name: 'Português', code: 'pt-BR' };

  constructor(
    private favoriteService: FavoriteService,
    private translateService: TranslateService,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    this.selectedLanguage = this.translateService.getCurrentLanguageValue();

    this.getCurrentLanguage();
    this.fetchFavoriteMovies();
  }

  fetchFavoriteMovies() {
    this.favoriteService.getFavorites().subscribe({
      next: (data) => {
        this.moviesList = [];
        this.userFavoriteMovies = data;
        this.userFavoriteMovies.forEach((favoriteMovie) => {
          this.movieService
            .getMovieDetailsById(
              favoriteMovie.movieId,
              this.selectedLanguage.code
            )
            .subscribe({
              next: (value) => {
                this.moviesList.push(value);
              },
              error: (err) => console.error(err),
            });
        });
      },
      error: (err) => console.error(err),
    });
  }

  removeFavoriteMovie(movie: Movie) {
    const favorite = this.userFavoriteMovies.find(
      (fav) => fav.movieId === movie.id
    );

    if (favorite) {
      this.favoriteService.deleteFavoriteMovie(String(favorite.id)).subscribe({
        next: () => this.fetchFavoriteMovies(),
        error: (err) => console.error(err),
      });
    }
  }

  private getCurrentLanguage(): void {
    this.translateService.getCurrentLanguage().subscribe({
      next: (res) => {
        this.selectedLanguage = res;
        this.moviesList = [];
        this.fetchFavoriteMovies();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
