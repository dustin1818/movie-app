import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOTIyZGQ1NjIwN2QzZmU5ODMyNTI1NDEwZWQ3NDZmMiIsIm5iZiI6MTYyNzk4NDI4OS43NjksInN1YiI6IjYxMDkxMWExMmY4ZDA5MDA0OGU5ZWQ5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7gMg8ambpFQeIAgZtxIavi5Cf5V28YPq3VjjeDK1vXM'
    }
  };

  getAllMovies() {
    return this.http.get('https://api.themoviedb.org/3/trending/all/day?language=en-US', this.options) ?? 'Error fetching movies';
  }

  getPopularMovies(page: number = 1) {
    return this.http.get(`https://api.themoviedb.org/3/tv/popular?language=en-US&page=${page}`, this.options) ?? 'Error fetching popular movies';
  }

  getDetails(id: string, type: string) {
    return this.http.get(`https://api.themoviedb.org/3/${type}/${id}?language=en-US`, this.options)
  }
  getVideos(id: string, type: string) {
    return this.http.get(`https://api.themoviedb.org/3/${type}/${id}/videos?language=en-US`, this.options)
  }

  constructor(private http: HttpClient) { }
}
