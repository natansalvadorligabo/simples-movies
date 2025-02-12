import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AvatarComponent } from "../avatar/avatar.component";
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'sidenav',
  imports: [RouterLink, RouterLinkActive, AvatarComponent, CommonModule, TranslatePipe],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  
  constructor(private router: Router) { }

  isActive(): boolean {
    return this.router.url.includes('/movie');
  }
}
