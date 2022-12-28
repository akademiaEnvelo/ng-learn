import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, delay, map } from 'rxjs';
import { VideoSource } from '../videos.component';
import { VideoSection } from './video-details.component';
import { SectionUpdatePayload } from './video-section-item.component';

export interface VideoDetailsState {
  sections: VideoSection[];
  currentVideoUrl: string;
}

@Injectable()
export class VideoDetailsStateService {
  private http = inject(HttpClient);
  private videoDetailsState$$ = new BehaviorSubject<VideoDetailsState>({
    sections: [],
    currentVideoUrl: '',
  });

  get videoDetailsState$() {
    return this.videoDetailsState$$.asObservable();
  }

  get selectCurrentUrl$() {
    return this.videoDetailsState$.pipe(map((state) => state.currentVideoUrl));
  }

  get selectSections$() {
    return this.videoDetailsState$.pipe(map((state) => state.sections));
  }

  private patchState(stateSlice: Partial<VideoDetailsState>) {
    this.videoDetailsState$$.next({
      ...this.videoDetailsState$$.value,
      ...stateSlice,
    });
  }

  fetch(videoId: string) {
    combineLatest([
      this.http.get<VideoSection[]>(
        `http://localhost:3000/videos/${videoId}/sections`
      ),
      this.http.get<VideoSource>('http://localhost:3000/videos/' + videoId),
    ]).subscribe(([sections, videoSource]) => {
      this.patchState({ sections, currentVideoUrl: videoSource.url });
    });
  }

  add(videoId: string, sectionName: string, timestamp: string) {
    this.http
      .post<VideoSection>(`http://localhost:3000/videos/${videoId}/sections`, {
        name: sectionName,
        timestamp,
      })
      .subscribe((section) => {
        this.patchState({
          sections: [...this.videoDetailsState$$.value.sections, section],
        });
      });
  }

  update({ sectionId, updatedName }: SectionUpdatePayload) {
    this.http
      .patch<VideoSection>(`http://localhost:3000/sections/${sectionId}`, {
        name: updatedName,
      })
      .subscribe((updatedSection) => {
        const updatedSections = this.videoDetailsState$$.value.sections.map(
          (section) =>
            section.id === updatedSection.id ? updatedSection : section
        );

        this.patchState({ sections: updatedSections });
      });
  }

  remove(sectionId: string) {
    this.http
      .delete(`http://localhost:3000/sections/${sectionId}`)
      .subscribe(() => {
        const filteredSections = this.videoDetailsState$$.value.sections.filter(
          (section) => section.id !== sectionId
        );

        this.patchState({ sections: filteredSections });
      });
  }

  protected ngOnDestroy() {
    // cleanup
    console.log('component destroyed');
  }
}
