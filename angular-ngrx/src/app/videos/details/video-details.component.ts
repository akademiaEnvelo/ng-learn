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
import { VideoDetailsStateService } from './video-details.state.service';
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

    <ol *ngIf="videoSections$ | async as videoSections">
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
  providers: [VideoDetailsStateService],
})
export class VideoDetailsComponent {
  @ViewChild('video')
  video!: ElementRef<HTMLVideoElement>;

  private videoDetailsStateService = inject(VideoDetailsStateService);
  private videoId = inject(ActivatedRoute).snapshot.params['id'];

  videosrc$ = this.videoDetailsStateService.selectCurrentUrl$;
  videoSections$ = this.videoDetailsStateService.selectSections$;

  ngOnInit() {
    this.videoDetailsStateService.fetch(this.videoId);
  }

  add(value: string, time: string) {
    this.videoDetailsStateService.add(this.videoId, value, time);
  }

  update(payload: SectionUpdatePayload) {
    this.videoDetailsStateService.update(payload);
  }

  remove(sectionId: string) {
    this.videoDetailsStateService.remove(sectionId);
  }

  goToSection([hours, minutes, seconds]: SectionSelectPayload['timestamp']) {
    this.video.nativeElement.currentTime =
      hours * 3600 + 60 * minutes + seconds;
  }

  useTime(timeInput: HTMLInputElement) {
    timeInput.value = formatSecondsToHHMMSS(
      this.video.nativeElement.currentTime
    );
  }
}
