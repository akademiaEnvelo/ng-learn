import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  combineLatest,
  EMPTY,
  exhaustMap,
  filter,
  map,
  of,
  tap,
} from 'rxjs';
import { VideoDetailsService } from '../vide-details.service';
import {
  VideoDetailsActions,
  VideoDetailsAPIActions,
} from './video-details.actions';

@Injectable()
export class VideoDetailsEffects {
  private actions$ = inject(Actions);
  private router = inject(Router);

  private service = inject(VideoDetailsService);

  removeVideoDetailsEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        tap((action) => {
          console.log('jaka akcja?', action);
        }),
        ofType(VideoDetailsActions.removeVideoSection),
        filter(() => confirm('Czy na pewno chcesz ją usunąć?')),
        exhaustMap(({ sectionId }) => {
          const remove$ = this.service.remove(sectionId).pipe(
            catchError((error) => {
              alert('Coś poszło nie tak');

              return of(VideoDetailsAPIActions.removeVideoSectionFailure());
            })
          );

          return combineLatest([remove$, of(sectionId)]);
        }),
        map(([_, sectionId]) =>
          VideoDetailsAPIActions.removeVideoSectionSuccess({ sectionId })
        )
      )
    // tylko dla efektów nie wywołujących akcji
    // {
    //   dispatch: false,
    // }
  );
}
