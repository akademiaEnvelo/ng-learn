import {
  BehaviorSubject,
  combineLatest,
  concat,
  concatMap,
  delay,
  exhaustMap,
  forkJoin,
  from,
  fromEvent,
  interval,
  map,
  merge,
  mergeMap,
  of,
  startWith,
  Subject,
  switchMap,
  tap,
} from "rxjs";

function getCharacterById(id: string) {
  return from(
    fetch("https://rickandmortyapi.com/api/character/" + id).then((res) =>
      res.json()
    )
  );
}

const inputValue$ = fromEvent(
  document.getElementById("input") as HTMLInputElement,
  "input"
);

fromEvent(document.getElementById("input") as HTMLInputElement, "input").pipe(
  switchMap((event) => {
    const id = (event.target as HTMLInputElement).value;

    return getCharacterById(id);
  })
);
// .subscribe((x) => {
//   console.log(x);
// });

// .subscribe((event) => {
//   const id = (event.target as HTMLInputElement).value;

//   getCharacterById(id).subscribe((character) => {
//     console.log(character);
//   });
// });

inputValue$
  .pipe(
    map((event) => (event.target as HTMLInputElement).value),
    concatMap((id) => {
      console.log({ id });

      return of(id).pipe(delay(2000));
    })
  )
  .subscribe(console.log);
// const bs$$ = new Subject();

// forkJoin([bs$$, of(123)]).subscribe(console.log);

// setTimeout(() => {
//   bs$$.next([1]);
//   bs$$.complete();
// }, 3000);
