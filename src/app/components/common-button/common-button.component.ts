import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'common-button',
  imports: [CommonModule],
  templateUrl: './common-button.component.html',
  styleUrl: './common-button.component.scss'
})
export class CommonButtonComponent {

  @Input() textColor: string = 'text-white';
  @Input() backgroundColor: string = 'bg-blue-700';
  @Input() hoverBackgroundColor: string = 'hover:bg-blue-600';
}
