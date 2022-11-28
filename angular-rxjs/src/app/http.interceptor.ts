import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, EMPTY, Observable } from 'rxjs';
import { ErrorHandlingService } from './error-handling.service';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  readonly URL = 'https://rickandmortyapi.com/api';

  constructor(private errorHandler: ErrorHandlingService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log('interceptuj!', request);

    const clone = request.clone({
      url: `${this.URL}${request.url}`,
    });

    // let clone: HttpRequest<unknown>;

    // if (request.url.endsWith('location')) {
    //   clone = request.clone({
    //     url: 'https://rickandmortyapi.com/api/episode',
    //   });
    // } else {
    //   clone = request.clone();
    // }

    // tutaj wszystko :o

    // this.errorHandler.handle404();

    return next.handle(clone).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('ojej błąd', error);

        return EMPTY;
      })
    );
  }
}
