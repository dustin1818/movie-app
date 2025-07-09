import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Details } from '../../interfaces/details';
import { SafePipe } from '../../pipes/safe.pipe';
import { LoadingComponent } from "../loading/loading.component";
import { finalize, forkJoin } from 'rxjs';
import { Video } from '../../interfaces/videos'

interface Videos {
  results: Video[]
}

@Component({
  selector: 'app-info-page',
  imports: [SafePipe, LoadingComponent, RouterLink],
  templateUrl: './info-page.component.html',
  styleUrl: './info-page.component.scss'
})
export class InfoPageComponent {
  id: string = '';
  type: string = '';
  details!: Details;
  videos!: Videos;
  isLoading: boolean = true;

  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  get firstFourVideos() {
    return this.videos?.results?.slice(0, 4) || [];
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id') ?? '';
      this.type = params.get('type') ?? '';
    })
    this.fetchAllData();
  }

  fetchAllData() {
    forkJoin({
      details: this.dataService.getDetails(this.id, this.type),
      videos: this.dataService.getVideos(this.id, this.type)
    })
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (response) => {
          this.details = response.details as Details;
          this.videos = response.videos as Videos
          this.isLoading = false;
        },
        error: (err) => {
          console.error("Error fetching data", err);
          this.isLoading = false;
        }
      })
  }
}
