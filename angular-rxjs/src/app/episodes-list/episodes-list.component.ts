import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ApiResponse, Character } from '../app.component';
import { ErrorHandlingService } from '../error-handling.service';

export interface Episode {
  name: string;
}

@Component({
  selector: 'app-episodes-list',
  templateUrl: './episodes-list.component.html',
  styleUrls: ['./episodes-list.component.scss'],
})
export class EpisodesListComponent {
  episodes: Episode[] = [];

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlingService
  ) {}

  ngOnInit() {
    this.http
      .get<ApiResponse<Character>>('https://rickandmortyapi.com/api/episode')
      .subscribe({
        next: (response) => {
          this.episodes = response.results;
        },
        error: (error: HttpErrorResponse) => {
          this.errorHandler.handle404(error);
        },
      });
  }
}
