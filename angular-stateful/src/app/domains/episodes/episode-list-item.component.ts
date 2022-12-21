import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { EpisodesStateService } from './episodes.state.service';
import { EpisodeDTO } from './episode.dto';

@Component({
  selector: 'app-episode-list-item[episode]',
  template: `
    <li>
      {{ episode.name }}
      <button
        [disabled]="episodesService.hasEpisode(episode.id)"
        (click)="episodesService.addEpisode(episode)"
      >
        ulubione
      </button>
    </li>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EpisodeListItemComponent {
  @Input() episode!: { id: number; name: string };

  count = 0;

  constructor(public episodesService: EpisodesStateService) {}

  ngOnInit() {
    // setInterval(() => {
    //   this.count++;
    // }, 1000);
  }
}
