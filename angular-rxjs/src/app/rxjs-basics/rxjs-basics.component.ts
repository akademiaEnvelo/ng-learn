import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  catchError,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  EMPTY,
  filter,
  from,
  fromEvent,
  interval,
  map,
  of,
  take,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-rxjs-basics',
  template: `
    <button id="btn">click</button>
    <input id="input" />
    <!-- {{ 'zimna woda' | podgrzej | prysznic }} -->
  `,
  styleUrls: ['./rxjs-basics.component.scss'],
})
export class RxjsBasicsComponent {
  ngOnInit() {
    const source$ = interval(1000);

    const btn = document.getElementById('btn') as HTMLButtonElement;

    btn.addEventListener('click', () => {
      // console.log('z event listenera');
    });

    const subscription = fromEvent(btn, 'click').subscribe(() => {
      // console.log('z fromEvent');
    });

    const input = document.getElementById('input') as HTMLInputElement;

    let timeout: NodeJS.Timeout;
    let lastValue = '';

    // input.addEventListener('input', (event: Event) => {
    //   clearTimeout(timeout);
    //   const target = event.target as HTMLInputElement;

    //   if (target.value.length < 3) {
    //     return;
    //   }

    //   timeout = setTimeout(() => {
    //     if (lastValue === target.value) {
    //       return;
    //     }

    //     console.log(target.value);
    //     lastValue = target.value;
    //   }, 300);

    //   // api call
    // });

    const debouncedValue$ = fromEvent(input, 'input').pipe(
      take(1),
      map((event) => (event.target as HTMLInputElement).value),
      debounceTime(200),
      filter((value) => value.length > 2),
      distinctUntilChanged(),
      catchError((error: HttpErrorResponse) => {
        console.log('oj błąd');
        return EMPTY;
      })
    );

    debouncedValue$.pipe(map((v) => v.toLocaleLowerCase())).subscribe({
      next: (v) => console.log(v),
      error: (error) => console.log(error),
    });

    // of([1, 2, 3, 4]).subscribe(console.log);

    // from(['a', 'b', 'c']).subscribe(console.log);
    // from([1, 2, 3, 4]).subscribe(console.log);
    // from(Promise.resolve(100)).subscribe(console.log);

    // combineLatest([
    //   from(['a', 'b', 'c']),
    //   from([1, 2, 3, 4])
    // ]).subscribe(
    //   console.log
    // );

    // 1. po 3 wpisanej literce
    // 2. po 200ms od nacisniesniecia ostatneigo klawisza zareagowal na zmiane
    // 3. nie reagowal jesli zmiana nie zmienila wartosci

    // let value = 0;
    // let result = 0;

    // setInterval(() => {
    //   console.log('1st tap', value);
    //   if (value % 2 === 0) {
    //     console.log('2nd tap', value);

    //     result = value * 2;

    //     if (result > 25) {
    //       // a'la subskrypcja
    //       console.log(result);
    //     }
    //   }

    //   value++;
    // }, 1000);

    // const onlyEven$ = source$.pipe(
    //   tap((value) => {
    //     console.log('1st tap', value);
    //   }),
    //   filter((value) => value % 2 === 0),
    //   tap((value) => {
    //     console.log('2nd tap', value);
    //   }),
    //   map((evenNumber) => evenNumber * 2),
    //   filter((mappedValue) => mappedValue > 25)
    // );

    // onlyEven$.subscribe((result) => {
    //   console.log('reactive', result);
    // });

    // source$.subscribe((result) => {
    //   console.log('drugie', result);
    // });
  }
}
