import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { combineLatest, map } from 'rxjs';

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
    <ng-container *ngIf="episodes$ | async as episodes">
      <nav>
        <button
          *ngFor="let entry of episodes | keyvalue"
          (click)="selectedSeason = +entry.key"
        >
          season {{ entry.key }}
        </button>
      </nav>

      <div>
        <h3>{{ selectedSeason }}</h3>
        <ol>
          <li *ngFor="let episodeEntry of episodes[selectedSeason] | keyvalue">
            {{ episodeEntry.value.name }}
          </li>
        </ol>
      </div>
    </ng-container>
  `,
  styles: [],
})
export class EpisodesComponent {
  selectedSeason = 1;

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
    map(([f, s, t]) => {
      return [...f.results, ...s.results, ...t.results];
    }),
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
    })
  );
}
