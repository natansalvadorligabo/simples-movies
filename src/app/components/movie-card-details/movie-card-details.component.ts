import { Component, Input, input } from '@angular/core';
import { AvatarComponent } from '../avatar/avatar.component';
import { BadgeComponent } from '../badge/badge.component';
import { CommonButtonComponent } from '../common-button/common-button.component';
import { Movie } from '../../@types/Movie';
import { CurrencyPipe, DatePipe, SlicePipe } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import { Credits } from '../../@types/Credits';
import { TranslatePipe } from '@ngx-translate/core';
import { Language } from '../../@types/Language';

@Component({
  selector: 'movie-card-details',
  imports: [
    BadgeComponent,
    CommonButtonComponent,
    DatePipe,
    SlicePipe,
    CurrencyPipe,
    AvatarComponent,
    ModalComponent,
    TranslatePipe
  ],
  templateUrl: './movie-card-details.component.html',
  styleUrl: './movie-card-details.component.scss',
})
export class MovieCardDetailsComponent {
  @Input() movie!: Movie;
  @Input() credits!: Credits;
  @Input() lang!: Language;

  isModalOpen: boolean = false;

  showMoreCast() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  get getDirector(): string {
    const director = this.credits.crew.find(
      (crew) => crew.job === 'Director'
    );
    return director ? director.name : 'Desconhecido';
  }
}
