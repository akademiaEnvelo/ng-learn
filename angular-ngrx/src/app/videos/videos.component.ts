import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

export interface VideoSource {
  id: number;
  url: string;
  title: string;
}

@Component({
  selector: 'app-videos',
  template: `
    <ol *ngIf="videos$ | async as videos">
      <li *ngFor="let video of videos">
        {{ video.title }} <a [routerLink]="[video.id]">Go to video</a>
      </li>
    </ol>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideosComponent {
  private http = inject(HttpClient);

  videos$ = this.http.get<VideoSource[]>('http://localhost:3000/videos');
}
