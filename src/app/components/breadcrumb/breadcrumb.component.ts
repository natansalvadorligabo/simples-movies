import { Component, Input } from '@angular/core';
import { NavigationItem } from '../../@types/NavigationItem ';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'breadcrumb',
  imports: [RouterLink],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
})
export class BreadcrumbComponent {
  @Input() previousPages: Array<NavigationItem> = [{ path: '', item: '' }];
  @Input() currentPage = '';
}
