import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EnvironmentInjector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TodosApiService } from './todos-api.service';

describe('TodosApiService', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [TodosApiService],
      imports: [HttpClientTestingModule],
    });
  });

  it('getTodos', (done) => {
    // arrange
    const expectedUrl = 'http://localhost:4200/api/todos?page=1';
    const service = TestBed.inject(EnvironmentInjector).get(TodosApiService);
    const httpController = TestBed.inject(HttpTestingController);

    // act
    service.getTodos({ page: 1 }).subscribe({
      next: (res) => {
        expect(res).toEqual({});
        done();
      },
      error: (err: HttpErrorResponse) => {
        expect(err.statusText).toEqual('Error');
        done();
      },
    });

    const req = httpController.expectOne(expectedUrl);

    req.flush({});
    // to test error
    // req.flush({}, { status: 404, statusText: 'Error' });
  });
});
