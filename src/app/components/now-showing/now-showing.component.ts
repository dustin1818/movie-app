import { Component } from '@angular/core';
import { Movies } from '../../interfaces/movies';
import { DataService } from '../../services/data.service';
import { LoadingComponent } from '../loading/loading.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-now-showing',
  imports: [LoadingComponent, RouterLink],
  templateUrl: './now-showing.component.html',
  styleUrl: './now-showing.component.scss'
})
export class NowShowingComponent {
      movies: Movies[] = [];
      pageNumber: number = 1;
      totalPages: number = 0;
      pages: number[] = [];
      isLoading: boolean = true;
    
      constructor(private dataService: DataService) { }
    
      ngOnInit(): void {
        this.isLoading = true;
        this.dataService.getNowShowingMovies().subscribe((res: any) => {
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
        this.dataService.getNowShowingMovies(page).subscribe((res: any) => {
          this.movies = res.results;
          window.scrollTo({ top: 0, behavior: 'smooth' });
        })
      }
  
}
