import { Injectable } from '@angular/core';
import { Character } from './app.component';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  endpoint = 'character';

  state = {};

  clear() {}

  constructor() {
    console.log('init!!!');
  }

  getCharacters(): Promise<{ results: Character[]; info: any }> {
    return fetch(`https://rickandmortyapi.com/api/${this.endpoint}`).then(
      (res) => res.json()
    );
  }
}

@Injectable({
  providedIn: 'root',
})
export class TurboApiService {
  getCharacters() {
    return Promise.resolve({} as { results: Character[]; info: any });
  }
}
