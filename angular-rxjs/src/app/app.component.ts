import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FavsService } from './favs.service';

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
  //  favCount = 5;
  characters: Character[] = [];
  locations: Location[] = [];

  constructor(private http: HttpClient, private favService: FavsService) {}

  incrementCount() {
    // this.favCount++;
    this.favService.favsCount$$.next(this.favService.favsCount$$.value + 1);

    this.favService.favCount++;
  }

  ngOnInit() {
    this.http.get<ApiResponse<Character>>('/character').subscribe({
      next: (response) => {
        this.characters = response.results;
      },
    });

    this.http.get<ApiResponse<Location>>('/location').subscribe({
      next: (response) => {
        this.locations = response.results;
      },
    });
  }
}
