import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { SafePipe } from '../../pipes/safe.pipe';

@Component({
  selector: 'app-episodes-page',
  imports: [SafePipe],
  templateUrl: './episodes-page.component.html',
  styleUrl: './episodes-page.component.scss'
})
export class EpisodesPageComponent {
  id: string = '';
  type: string = '';
  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id') ?? '';
      this.type = params.get('type') ?? '';
    })
  }

}
