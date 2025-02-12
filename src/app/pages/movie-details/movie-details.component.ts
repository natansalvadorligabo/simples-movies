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
    CommonModule,
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
})
export class MovieDetailsComponent implements OnInit {
  id: number = 0;
  movie!: Movie;
  credits!: Credits;
  reviews: Review[] = [];
  language: Language = { name: 'Português', code: 'pt-BR' };

  isReviewModalOpen: boolean = false;
  reviewForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private translateService: TranslateService,
    private reviewService: ReviewService
  ) {
    this.reviewForm = new FormGroup({
      rating: new FormControl(0, [Validators.required]),
      reviewContent: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      watchedDate: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.language = this.translateService.getCurrentLanguageValue();
    this.fetchMovieDetailsById();
    this.fetchMovieCreditsById();
    this.fetchReviews();
    this.getCurrentLanguage();
  }

  onSubmitReview() {
    this.reviewService
      .createMovieReview({ ...this.reviewForm.value, author: "Natan", movieId: this.id })
      .subscribe({
        next: () => {
          this.fetchReviews();
          this.closeModal();
          this.reviewForm.reset();
        },
        error: (err) => console.error(err),
      });
  }

  setReviewContent(value: number) {
    // this.reviewForm.get('rating')?.setValue(value);
    this.reviewForm.patchValue({
      rating: value
    })
  }

  fetchReviews(): void {
    this.reviewService.getReviewsByMovie(this.id).subscribe({
      next: (data) => {
        this.reviews = data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  fetchMovieDetailsById(): void {
    this.movieService
      .getMovieDetailsById(this.id, this.language.code)
      .subscribe({
        next: (res) => {
          this.movie = res;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  fetchMovieCreditsById(): void {
    this.movieService
      .getCreditsByMovieId(this.id, this.language.code)
      .subscribe({
        next: (res) => {
          this.credits = res;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  private getCurrentLanguage() {
    this.translateService.getCurrentLanguage().subscribe({
      next: (res) => {
        this.language = res;
        this.fetchMovieDetailsById();
        this.fetchMovieCreditsById();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  showReviewModal() {
    this.isReviewModalOpen = true;
  }

  closeModal() {
    this.isReviewModalOpen = false;
  }
}
