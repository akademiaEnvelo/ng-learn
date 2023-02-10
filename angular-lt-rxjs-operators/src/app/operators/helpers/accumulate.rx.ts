import { Observable } from 'rxjs';
import { scan } from 'rxjs/operators';

export function accumulate<T>() {
  return (source: Observable<T>): Observable<T[]> => {
    return new Observable((subscriber) => {
      source
        .pipe(scan<T, T[]>((acc, current) => [...acc, current], []))
        .subscribe({
          next(value) {
            subscriber.next(value);
          },
        });
    });
  };
}
