import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Injectable,
} from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import {
  catchError,
  debounce,
  debounceTime,
  distinctUntilChanged,
  iif,
  interval,
  Subject,
  take,
  takeUntil,
} from 'rxjs';

@Injectable()
export class Service {
  private notifications$$ = new Subject<number>();

  get notifications$() {
    return this.notifications$$.asObservable();
  }

  constructor() {
    interval(500).subscribe(() => {
      this.notifications$$.next(Math.random());
    });
  }
}

@Component({
  selector: 'app-take',
  template: `
    <div class="flex">
      <section>
        <button (click)="stop()">stop</button>
        {{ notifs$ | async }}
      </section>
    </div>
  `,
  styles: [],
  providers: [Service],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TakeComponent {
  private subj = new Subject<void>();

  notifs$ = inject(Service).notifications$.pipe(takeUntil(this.subj));

  stop() {
    this.subj.next();
  }
}
