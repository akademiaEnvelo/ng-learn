import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { BehaviorSubject, combineLatest, map, of, take, tap } from 'rxjs';
import { AuthStateService } from '../../auth';
import { EpisodeDTO } from './episode.dto';
import { EpisodesStateService } from './episodes.state.service';

export interface ApiResponse<T> {
  info: { count: number; pages: number };
  results: T[];
}

@Component({
  selector: 'app-episodes',
  template: `
    <ng-container *ngIf="episodes$ | async as episodes; else loading">
      <!-- <app-characters
        *ngIf="configuration$ | async as configuration"
        [x]="[]"
        [y]="configuration"
      ></app-characters> -->

      <!-- <app-test-cd
        [value]="selectedSeason + ''"
        [person]="person"
      ></app-test-cd>
      <button (click)="person = { name: 'john' }">change person name</button>
      {{ person.name }}
      <br /><br /> -->
      <nav>
        <button
          *ngFor="let entry of episodes | keyvalue"
          (click)="selectedSeason = +entry.key; cdr.detectChanges()"
        >
          season {{ entry.key }}
        </button>
      </nav>

      <div>
        <h3>Sezon {{ selectedSeason }}</h3>
        <ol>
          <app-episode-list-item
            *ngFor="let episodeEntry of episodes[selectedSeason] | keyvalue"
            [episode]="episodeEntry.value"
          >
          </app-episode-list-item>
          <!-- <li *ngFor="let episodeEntry of episodes[selectedSeason] | keyvalue">
            {{ episodeEntry.value.name }}
            <button
              [disabled]="episodesService.hasEpisode(episodeEntry.value.id)"
              (click)="episodesService.addEpisode(episodeEntry.value)"
            >
              ulubione
            </button>
          </li> -->
        </ol>
      </div>
    </ng-container>
    <ng-template #loading>Loading...</ng-template>
  `,
  styles: [],
})
export class EpisodesComponent {
  episodesService = inject(EpisodesStateService);
  authValue$ = inject(AuthStateService).auth$.pipe(take(1));
  selectedSeason = 1;

  cdr = inject(ChangeDetectorRef);

  person: any = {};

  state = new BehaviorSubject<{ auth: boolean; list: string[] }>({
    auth: false,
    list: [],
  });

  ngOnInit() {
    this.state.next({
      ...this.state.value,
      auth: true,
    });

    setTimeout(() => {
      this.person = { name: 'kamil', age: '35' };
    }, 3000);
  }

  configuration$ = of({ configuration: false, x: 12312 });

  first = of(false);
  second = of(213);
  // view model
  vm = combineLatest([this.first, this.second]).pipe(
    map(([isAdmin, time]) => ({
      isAdmin,
      time,
    }))
  );

  episodes$ = combineLatest([
    inject(HttpClient).get<ApiResponse<EpisodeDTO>>(
      'https://rickandmortyapi.com/api/episode?page=1'
    ),
    inject(HttpClient).get<ApiResponse<EpisodeDTO>>(
      'https://rickandmortyapi.com/api/episode?page=2'
    ),
    inject(HttpClient).get<ApiResponse<EpisodeDTO>>(
      'https://rickandmortyapi.com/api/episode?page=3'
    ),
  ]).pipe(
    map(([f, s, t]) => [...f.results, ...s.results, ...t.results]),
    map((episodes) =>
      episodes.map((episode) => {
        const [season, episodeNr] = episode.episode.slice(1).split('E');

        return {
          ...episode,
          episode: { season: +season, episode: +episodeNr },
        };
      })
    ),
    map((episodes) => {
      const episodesMap = {} as {
        [key: number]: { [key: number]: typeof episodes[number] };
      };

      episodes.forEach((item) => {
        if (episodesMap[item.episode.season]) {
          episodesMap[item.episode.season][item.episode.episode] = item;
        } else {
          episodesMap[item.episode.season] = {
            [item.episode.episode]: item,
          };
        }
      });

      return episodesMap;
    }),
    tap((results) => {
      console.log(results);
      setTimeout(() => {
        this.cdr.detectChanges();
      }, 300);
    })
  );
}

type T = Array<{ id: string; date: number }>;

interface X {
  a: string;
  b: string;
}

type BFromX = X['b'];

type ItemFromT = T[number];
