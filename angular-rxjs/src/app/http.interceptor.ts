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
    // console.log('interceptuj!', request);

    const clone = request.clone({
      url: `${this.URL}${request.url}`,
    });

    return next.handle(clone).pipe(
      catchError((error: HttpErrorResponse) => {
        // console.log('ojej błąd', error);

        return EMPTY;
      })
    );
  }
}
