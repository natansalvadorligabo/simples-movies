import { Component, Input } from '@angular/core';
import { AvatarComponent } from '../avatar/avatar.component';
import { Review } from '../../@types/Review';
import { DatePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'review-card',
  imports: [AvatarComponent, DatePipe, TranslatePipe],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.scss',
})
export class ReviewCardComponent {
  @Input() review!: Review;
}
