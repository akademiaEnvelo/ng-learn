import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { BehaviorSubject, combineLatest, map, of, tap } from 'rxjs';

export interface ApiResponse<T> {
  info: { count: number; pages: number };
  results: T[];
}

export interface EpisodeDTO {
  air_date: string;
  characters: string[];
  created: string;
  episode: string;
  id: number;
  name: string;
  url: string;
}

@Component({
  selector: 'app-episodes',
  template: `
    <ng-container *ngIf="episodes$ | async as episodes; else loading">
      <app-characters
        *ngIf="configuration$ | async as configuration"
        [x]="[]"
        [y]="configuration.configuration"
      ></app-characters>

      <nav>
        <button
          *ngFor="let entry of episodes | keyvalue"
          (click)="selectedSeason = +entry.key"
        >
          season {{ entry.key }}
        </button>
      </nav>

      <div>
        <h3>Sezon {{ selectedSeason }}</h3>
        <ol>
          <li *ngFor="let episodeEntry of episodes[selectedSeason] | keyvalue">
            {{ episodeEntry.value.name }}
          </li>
        </ol>
      </div>
    </ng-container>
    <ng-template #loading>Loading...</ng-template>
  `,
  styles: [],
})
export class EpisodesComponent {
  selectedSeason = 1;

  state = new BehaviorSubject<{ auth: boolean; list: string[] }>({
    auth: false,
    list: [],
  });

  ngOnInit() {
    this.state.next({
      ...this.state.value,
      auth: true,
    });
  }

  configuration$ = of({ configuration: false, x: 12312 });

  first = of(false);
  second = of(213);

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
