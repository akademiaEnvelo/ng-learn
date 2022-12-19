import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EpisodesStateService {
  private episodes$$ = new BehaviorSubject<{ id: number; name: string }[]>([]);

  get episodes$() {
    return this.episodes$$.asObservable();
  }

  addEpisode(episode: { id: number; name: string }) {
    this.episodes$$.next([...this.episodes$$.value, episode]);
  }

  removeEpisode(episodeId: number) {
    this.episodes$$.next(
      this.episodes$$.value.filter(({ id }) => id !== episodeId)
    );
  }

  hasEpisode(episodeId: number): boolean {
    console.log('render');
    return this.episodes$$.value.some(({ id }) => id === episodeId);
  }
}
