import { Component } from '@angular/core';
import { Popular } from '../../interfaces/popular';
import { DataService } from '../../services/data.service';
import { RouterLink } from '@angular/router';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-popular-movies',
  imports: [RouterLink, LoadingComponent],
  templateUrl: './popular-movies.component.html',
  styleUrl: './popular-movies.component.scss'
})
export class PopularMoviesComponent {
  movies: Popular[] = [];
  pageNumber: number = 1;
  totalPages: number = 0;
  pages: number[] = [];
  isLoading: boolean = true;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.dataService.getPopularMovies().subscribe((res: any) => {
      this.movies = res.results;
      this.totalPages = 100;
      this.generatePageNumbers();
      this.isLoading = false;
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
