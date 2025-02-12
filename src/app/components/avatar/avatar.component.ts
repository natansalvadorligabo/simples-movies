import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'avatar',
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss'
})
export class AvatarComponent {
  @Input() photo: string = "";
  @Input() name: string = "";
  @Input() subtitle?: string = "";
  @Input() size: string = "size-12";
}
