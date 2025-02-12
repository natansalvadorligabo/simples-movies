import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'search-bar',
  imports: [FormsModule, CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  @Input('placeholder') textPlaceholder = "";
  searchQuery: string = "";

  @Output() eventEmitter = new EventEmitter<string>();

  constructor() {}

  onInputChanges(): void {
    this.eventEmitter.emit(this.searchQuery);  
  }
}
