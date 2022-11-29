import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlingService } from './error-handling.service';

export interface Character {
  name: string;
}

export interface Location {
  name: string;
}

export interface PaginationApiInfo {}

export interface ApiResponse<T> {
  info: PaginationApiInfo;
  results: T[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  characters: Character[] = [];
  locations: Location[] = [];

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlingService
  ) {}

  private onError(error: HttpErrorResponse) {
    this.errorHandler.handle404(error);
  }

  ngOnInit() {
    // fetch('https://rickandmortyapi.com/api/character');
    // .then((res) => res.json())
    // .then((response: ApiResponse<Character>) => {
    //   // this.characters = response.results;
    // });

    this.http.get<ApiResponse<Character>>('/character').subscribe({
      next: (response) => {
        this.characters = response.results;
      },
      // error: this.onError,
    });

    this.http.get<ApiResponse<Location>>('/location').subscribe({
      next: (response) => {
        this.locations = response.results;
      },
      // error: this.onError,
    });

    // fetch('url', {
    //   method: 'POST',
    //   body: JSON.stringify({})
    // })

    this.http.patch<{}>('url', {
      login: 'username',
      password: 'rgeuwgre2352345!',
    });
  }
}
