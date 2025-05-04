import { Component } from '@angular/core';
import { Movies } from '../../interfaces/movies';
import { DataService } from '../../services/data.service';
import { RouterLink } from '@angular/router';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-top-rated',
  imports: [RouterLink, LoadingComponent],
  templateUrl: './top-rated.component.html',
  styleUrl: './top-rated.component.scss'
})
export class TopRatedComponent {
    movies: Movies[] = [];
    pageNumber: number = 1;
    totalPages: number = 0;
    pages: number[] = [];
    isLoading: boolean = true;
  
    constructor(private dataService: DataService) { }
  
    ngOnInit(): void {
      this.isLoading = true;
      this.dataService.getTopRatedMovies().subscribe((res: any) => {
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
      this.dataService.getTopRatedMovies(page).subscribe((res: any) => {
        this.movies = res.results;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })
    }

}
