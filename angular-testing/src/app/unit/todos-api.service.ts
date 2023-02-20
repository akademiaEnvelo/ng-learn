import { HttpClient } from '@angular/common/http';
import { inject, Injectable, InjectionToken } from '@angular/core';
import { Todo } from './todos.state';

export const API_URL = new InjectionToken('API_URL', {
  factory() {
    return 'http://localhost:4200/api';
  },
});

@Injectable({
  providedIn: 'root',
})
export class TodosApiService {
  private http = inject(HttpClient);
  private API_URL = inject(API_URL);

  getTodos({ page }: { page: number }) {
    const url = new URL(`${this.API_URL}/todos`);
    url.searchParams.set('page', page.toString());

    return this.http.get<{ results: Todo[]; info: unknown }>(url.href);
  }
}
