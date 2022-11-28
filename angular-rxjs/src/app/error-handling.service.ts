import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService {
  handle404(error: HttpErrorResponse) {
    if (error.status === 404 || error.status === 0) {
      alert(error.status);
      // handle error page
    }
  }
}
