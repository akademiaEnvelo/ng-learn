import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { TodosApiService } from './todos-api.service';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private apiService = inject(TodosApiService);

  getTodos(page = 1) {
    return this.apiService.getTodos({ page }).pipe(map(({ results }) => results));
  }
}
