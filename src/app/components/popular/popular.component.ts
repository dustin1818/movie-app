import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Popular } from '../../interfaces/movies';
import { RouterLink } from '@angular/router';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-popular',
  imports: [RouterLink, LoadingComponent],
  templateUrl: './popular.component.html',
  styleUrl: './popular.component.scss'
})
export class PopularComponent {
  movies: Popular[] = [];
  pageNumber: number = 1;
  totalPages: number = 0;
  pages: number[] = [];
  isLoading: boolean = true;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.dataService.getPopularSeries().subscribe((res: any) => {
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
    this.dataService.getPopularSeries(page).subscribe((res: any) => {
      this.movies = res.results;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    })
  }
}
