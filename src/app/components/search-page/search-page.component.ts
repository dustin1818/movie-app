import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';
import { SearchResult } from '../../interfaces/search-result';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-search-page',
  imports: [LoadingComponent, RouterLink],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent {
  isLoading: boolean = true;
  searchQuery: string = '';
  searchResults: SearchResult[] = [];
  pageNumber: number = 1;
  totalPages: number = 0;
  pages: number[] = [];

  constructor(private route: ActivatedRoute, private dataService: DataService){}

  ngOnInit():void {
    this.isLoading = true;
    this.route.params.subscribe(params => {
      const query = params['query'];
      this.searchQuery = query;
    });

    this.dataService.getSearchResults(this.searchQuery, this.pageNumber).subscribe((res: any) => {
      this.searchResults = res.results;
      this.totalPages = res.total_pages;
      this.generatePageNumbers();
      this.isLoading = false;
    })
  }

  generatePageNumbers(): void {
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  loadPage(page: number) {
    this.pageNumber = page;
    this.dataService.getSearchResults(this.searchQuery, page).subscribe((res: any) => {
      this.searchResults = res.results;
    })
  }
}
