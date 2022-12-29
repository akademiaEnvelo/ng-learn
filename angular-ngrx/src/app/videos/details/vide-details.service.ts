import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { AppState } from 'src/app/app.module';
import { VideoSource } from '../videos.component';
import { VideoDetailsActions } from './store/video-details.actions';
import { VideoSection } from './video-details.component';
import { SectionUpdatePayload } from './video-section-item.component';

@Injectable({
  providedIn: 'root',
})
export class VideoDetailsService {
  private store = inject<Store<AppState>>(Store);
  private http = inject(HttpClient);

  fetch(videoId: string) {
    combineLatest([
      this.http.get<VideoSection[]>(
        `http://localhost:3000/videos/${videoId}/sections`
      ),
      this.http.get<VideoSource>('http://localhost:3000/videos/' + videoId),
    ]).subscribe(([sections, videoSource]) => {
      this.store.dispatch(VideoDetailsActions.addVideoSections({ sections }));
      this.store.dispatch(
        VideoDetailsActions.setCurrentVideoUrl({ videoUrl: videoSource.url })
      );
    });
  }

  add(videoId: string, sectionName: string, timestamp: string) {
    this.http
      .post<VideoSection>(`http://localhost:3000/videos/${videoId}/sections`, {
        name: sectionName,
        timestamp,
      })
      .subscribe((section) => {
        this.store.dispatch(VideoDetailsActions.addVideoSection({ section }));
      });
  }

  update({ sectionId, updatedName }: SectionUpdatePayload) {
    this.http
      .patch<VideoSection>(`http://localhost:3000/sections/${sectionId}`, {
        name: updatedName,
      })
      .subscribe((updatedSection) => {
        this.store.dispatch(
          VideoDetailsActions.updateVideoSectionName({
            sectionId,
            updatedName: updatedSection.name,
          })
        );
      });
  }

  remove(sectionId: string) {
    return this.http.delete(`http://localhost:3000/sections/${sectionId}`);
    // .subscribe(() => {
    //   this.store.dispatch(
    //     VideoDetailsActions.removeVideoSection({ sectionId })
    //   );
    // });
  }

  protected ngOnDestroy() {
    // cleanup
    console.log('component destroyed');
    // this.store.dispatch(VideoDetailsActions.cleanState)
  }
}
