import { Component, OnInit } from '@angular/core';
import { MovieCardDetailsComponent } from '../../components/movie-card-details/movie-card-details.component';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../@types/Movie';
import { MovieService } from '../../services/movie.service';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { Credits } from '../../@types/Credits';
import { TranslateService } from '../../services/translate.service';
import { Language } from '../../@types/Language';
import { LanguageSelectorComponent } from '../../components/language-selector/language-selector.component';
import { TranslatePipe } from '@ngx-translate/core';
import { ModalComponent } from '../../components/modal/modal.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ReviewCardComponent } from '../../components/review-card/review-card.component';
import { CommonModule } from '@angular/common';
import { Review } from '../../@types/Review';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-movie-details',
  imports: [
    MovieCardDetailsComponent,
    BreadcrumbComponent,
    LanguageSelectorComponent,
    TranslatePipe,
    ModalComponent,
    ReactiveFormsModule,
    FormsModule,
    ReviewCardComponent,
    CommonModule
],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
})
export class MovieDetailsComponent implements OnInit {
  movieId: number = 0;
  movieDetails!: Movie;
  movieCredits!: Credits;
  movieReviews: Review[] = [];
  selectedLanguage: Language = { name: 'Português', code: 'pt-BR' };

  isReviewModalVisible: boolean = false;
  movieReviewForm: FormGroup;

  reviewPublishStatus = '';
  isInvalidReviewDate = false;

  minDate = '';
  maxDate = '';

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private translateService: TranslateService,
    private reviewService: ReviewService
  ) {
    this.movieReviewForm = new FormGroup({
      rating: new FormControl(0, [Validators.required]),
      reviewContent: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      watchedDate: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.movieId = Number(this.route.snapshot.paramMap.get('id'));

    this.selectedLanguage = this.translateService.getCurrentLanguageValue();
    this.fetchMovieDetailsById();
    this.fetchMovieCreditsById();
    this.fetchReviews();
    this.getCurrentLanguage();
  }

  onSubmitReview() {
    if (this.dateValidator(new Date(this.movieReviewForm.value.watchedDate))) {
      this.reviewService
        .createMovieReview({
          ...this.movieReviewForm.value,
          author: 'Natan',
          movieId: this.movieId,
        })
        .subscribe({
          next: () => {
            this.fetchReviews();
            this.closeModal();
            this.movieReviewForm.reset();
            this.reviewPublishStatus = 'success';
            setTimeout(() => {
              this.reviewPublishStatus = '';
            }, 3000);
          },
          error: (err) => {
            this.reviewPublishStatus = 'failure';
            console.error(err);
            setTimeout(() => {
              this.reviewPublishStatus = '';
            }, 3000);
          },
        });
    } else {
      this.isInvalidReviewDate = true;
    }
  }

  dateValidator(date: Date): boolean {
    const release = new Date(this.movieDetails.release_date);
    const today = new Date();

    let valid = false;

    if (date > release && date < today) {
      valid = true;
    }
    return valid;
  }

  setReviewRating(value: number) {
    // this.reviewForm.get('rating')?.setValue(value);
    this.movieReviewForm.patchValue({
      rating: value,
    });
  }

  fetchReviews(): void {
    this.reviewService.getReviewsByMovie(this.movieId).subscribe({
      next: (data) => {
        this.movieReviews = data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  fetchMovieDetailsById(): void {
    this.movieService
      .getMovieDetailsById(this.movieId, this.selectedLanguage.code)
      .subscribe({
        next: (res) => {
          this.movieDetails = res;
          this.minDate = new Date(this.movieDetails.release_date).toISOString().split('T')[0];
          this.maxDate = new Date().toISOString().split('T')[0];
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  fetchMovieCreditsById(): void {
    this.movieService
      .getCreditsByMovieId(this.movieId, this.selectedLanguage.code)
      .subscribe({
        next: (res) => {
          this.movieCredits = res;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  private getCurrentLanguage() {
    this.translateService.getCurrentLanguage().subscribe({
      next: (res) => {
        this.selectedLanguage = res;
        this.fetchMovieDetailsById();
        this.fetchMovieCreditsById();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  showReviewModal() {
    this.isReviewModalVisible = true;
  }

  closeModal() {
    this.isReviewModalVisible = false;
  }
}
