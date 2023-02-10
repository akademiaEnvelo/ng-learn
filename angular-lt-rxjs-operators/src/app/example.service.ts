import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export interface ApiResponse<T> {
  info: any;
  results: T;
}

@Injectable()
export class ExampleService {
  private http = inject(HttpClient);

  getCharacters() {
    return this.http.get<ApiResponse<{ name: string }>>(
      'https://rickandmortyapi.com/api/character'
    );
  }
}
