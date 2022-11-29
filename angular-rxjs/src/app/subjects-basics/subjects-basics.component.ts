import { Component } from '@angular/core';
import { BehaviorSubject, interval, ReplaySubject, Subject } from 'rxjs';

@Component({
  selector: 'app-subjects-basics',
  template: ` <p>subjects-basics works!</p> `,
  styles: [],
})
export class SubjectsBasicsComponent {
  ngOnInit() {
    const netflix$$ = new BehaviorSubject<string[]>([]);

    // łukasz
    netflix$$.subscribe((episodes) => {
      console.log('łukasz ', episodes);
    });

    netflix$$.next([...netflix$$.value, '1899']);

    // kamil
    netflix$$.subscribe((episodes) => {
      console.log('kamil', episodes);
    });

    netflix$$.next([...netflix$$.value, 'Arcane']);
  }
}
