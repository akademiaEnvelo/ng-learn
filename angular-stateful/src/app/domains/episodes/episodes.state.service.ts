import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, of, switchMap, tap } from 'rxjs';
import { UserStateService } from 'src/app/core/user.state.service';

@Injectable({
  providedIn: 'root',
})
export class EpisodesStateService {
  private http = inject(HttpClient);
  private user$ = inject(UserStateService).user$;

  private episodes$$ = new BehaviorSubject<{ id: number; name: string }[]>([]);

  constructor() {
    this.user$
      .pipe(
        switchMap((user) => {
          const episodes$ = this.http.get<
            { id: number; name: string; userId: number }[]
          >(`http://localhost:3000/600/users/${user.id}/my-episodes/`, {
            headers: new HttpHeaders().set(
              'Authorization',
              'Bearer ' + localStorage.getItem('token')!
            ),
          });

          return combineLatest([episodes$, of(user)]);
        })
      )
      .subscribe(([episodes, user]) => {
        // and user
        console.log(episodes, user);

        this.episodes$$.next(
          episodes.map((episode) => ({ id: episode.id, name: episode.name }))
        );
      });
  }

  get episodes$() {
    return this.episodes$$.asObservable();
  }

  addEpisode(episode: { id: number; name: string }) {
    this.user$
      .pipe(
        switchMap((user) =>
          this.http.post(
            `http://localhost:3000/600/users/${user.id}/my-episodes/`,
            {
              name: episode.name,
              id: episode.id,
            },
            {
              headers: new HttpHeaders().set(
                'Authorization',
                'Bearer ' + localStorage.getItem('token')!
              ),
            }
          )
        )
      )
      .subscribe(() => {
        this.episodes$$.next([...this.episodes$$.value, episode]);
      });
  }

  removeEpisode(episodeId: number) {
    this.episodes$$.next(
      this.episodes$$.value.filter(({ id }) => id !== episodeId)
    );
  }

  hasEpisode(episodeId: number): boolean {
    return this.episodes$$.value.some(({ id }) => id === episodeId);
  }
}
