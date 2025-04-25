import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(private router: Router){}

  filterMovieResults(filter: string) {
    if(filter && filter.trim()){
      this.router.navigate(['/search', filter.trim()]);
    }
  }
}
