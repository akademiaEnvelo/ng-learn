import { EnvironmentInjector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { TodosApiService } from './todos-api.service';
import { TodosService } from './todos.service';
import { Todo } from './todos.state';

// Router
// this.router.navigate(['/tam']);

// ng-mocks

const routerMock = {
  async navigate(path: string[]) {},
};

describe('TodosService', () => {
  const todosApiServiceMock = {
    getTodos(params: { page: number }): Observable<{
      results: Todo[];
      info: unknown;
    }> {
      return of({
        results: [
          {
            id: 'f9eae5ce-e2af-4fce-9d90-d0e027c443e8',
            name: 'learn tests',
            status: 'todo',
          },
        ],
        info: null,
      });
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        TodosService,
        {
          provide: TodosApiService,
          useValue: todosApiServiceMock,
        },
        {
          provide: Router,
          useValue: routerMock,
        },
      ],
    });
  });
  it('getTodos', (done) => {
    // arrange
    const service = TestBed.inject(EnvironmentInjector).get(TodosService);

    jest.spyOn(routerMock, 'navigate');
    // act
    service.getTodos().subscribe({
      next: (results) => {
        // assert
        expect(results[0].id).toBe('f9eae5ce-e2af-4fce-9d90-d0e027c443e8');
        done();
      },
    });
  });
});
