import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { EpisodesStateService } from '../episodes.state.service';

@Component({
  selector: 'app-my-episodes',
  template: `
    <p>My episodes</p>
    <div *ngFor="let episode of episodes$ | async">
      <button>{{ episode.name }}</button>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyEpisodesComponent {
  episodes$ = inject(EpisodesStateService).episodes$;
}
