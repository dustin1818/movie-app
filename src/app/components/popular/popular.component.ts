import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Popular } from '../../interfaces/popular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-popular',
  imports: [RouterLink],
  templateUrl: './popular.component.html',
  styleUrl: './popular.component.scss'
})
export class PopularComponent {
  movies: Popular[] = [];
  pageNumber: number = 1;
  totalPages: number = 0;
  pages: number[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getPopularMovies().subscribe((res: any) => {
      this.movies = res.results;
      this.totalPages = 100;
      this.generatePageNumbers();
    })
  }

  generatePageNumbers(): void {
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  loadPage(page: number) {
    this.pageNumber = page;
    this.dataService.getPopularMovies(page).subscribe((res: any) => {
      this.movies = res.results;
    })
  }
}
