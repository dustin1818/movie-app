import { Component } from '@angular/core';
import { Movies } from '../../interfaces/movies';
import { DataService } from '../../services/data.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  movies: Movies[] = [];
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getAllMovies().subscribe((res: any) => {
      this.movies = res.results;
    })
  }
}
