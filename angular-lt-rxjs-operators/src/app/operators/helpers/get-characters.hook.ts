import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { Character } from './Character';
import { Response } from './Response';

export function useCharacters() {
  return inject(HttpClient)
    .get<Response<Character>>('https://rickandmortyapi.com/api/character')
    .pipe(map(({ results }) => results));
}
