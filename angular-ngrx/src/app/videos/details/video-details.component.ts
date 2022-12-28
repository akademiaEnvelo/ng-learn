import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { map, tap } from 'rxjs';
import { formatSecondsToHHMMSS } from '../../format-to-hhmmss';
import { VideoSource } from '../videos.component';
import {
  SectionSelectPayload,
  SectionUpdatePayload,
  VideoSectionItemComponent,
} from './video-section-item.component';

export interface VideoSection {
  id: string;
  name: string;
  timestamp: string;
}

@Component({
  selector: 'app-video-details',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe, VideoSectionItemComponent],
  template: `
    <video
      *ngIf="videosrc$ | async as src"
      #video
      width="500"
      controls
      [src]="src"
    ></video>

    <fieldset>
      <label for="section">dodaj sekcje</label>
      <input #name (keyup.enter)="add(name.value, time.value)" id="section" />
      <input #time type="time" />
      <button (click)="useTime(time)">use current time</button>
      <button (click)="add(name.value, time.value)">Dodaj</button>
    </fieldset>

    <ol *ngIf="videoSections$ | async">
      <li *ngFor="let section of videoSections">
        <app-video-section-item
          [section]="section"
          (update)="update($event)"
          (select)="goToSection($event.timestamp)"
          (remove)="remove($event.sectionId)"
        ></app-video-section-item>
      </li>
    </ol>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoDetailsComponent {
  @ViewChild('video')
  video!: ElementRef<HTMLVideoElement>;

  http = inject(HttpClient);
  cdr = inject(ChangeDetectorRef);

  videoId = inject(ActivatedRoute).snapshot.params['id'];

  videosrc$ = this.http
    .get<VideoSource>('http://localhost:3000/videos/' + this.videoId)
    .pipe(map((video) => video.url));

  videoSections: VideoSection[] = [];

  videoSections$ = this.http
    .get<VideoSection[]>(
      `http://localhost:3000/videos/${this.videoId}/sections`
    )
    .pipe(
      tap((sections) => {
        this.videoSections = sections;
        this.cdr.detectChanges();
      })
    );

  add(value: string, time: string) {
    this.http
      .post<VideoSection>(
        `http://localhost:3000/videos/${this.videoId}/sections`,
        {
          name: value,
          timestamp: time,
        }
      )
      .subscribe((section) => {
        this.videoSections = [...this.videoSections, section];
        this.cdr.detectChanges();
      });
  }

  update({ sectionId, updatedName }: SectionUpdatePayload) {
    this.http
      .patch<VideoSection>(`http://localhost:3000/sections/${sectionId}`, {
        name: updatedName,
      })
      .subscribe((updated) => {
        this.videoSections = this.videoSections.map((section) =>
          section.id === updated.id
            ? {
                ...updated,
              }
            : section
        );

        this.cdr.detectChanges();
      });
  }

  goToSection([hours, minutes, seconds]: SectionSelectPayload['timestamp']) {
    this.video.nativeElement.currentTime =
      hours * 3600 + 60 * minutes + seconds;
  }

  remove(sectionId: string) {
    this.http
      .delete(`http://localhost:3000/sections/${sectionId}`)
      .subscribe(() => {
        this.videoSections = this.videoSections.filter(
          (section) => section.id !== sectionId
        );
        this.cdr.detectChanges();
      });
  }

  useTime(timeInput: HTMLInputElement) {
    timeInput.value = formatSecondsToHHMMSS(
      this.video.nativeElement.currentTime
    );
  }
}
