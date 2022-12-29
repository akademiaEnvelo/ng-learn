import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideosComponent } from './videos.component';
import { RouterModule } from '@angular/router';
import { VideoDetailsComponent } from './details/video-details.component';
import { StoreModule } from '@ngrx/store';
import { videoDetailsFeatureKey } from './details/store/video-details.state';
import { videoDetailsReducer } from './details/store/video-details.reducer';
import { EffectsModule } from '@ngrx/effects';
import { VideoDetailsEffects } from './details/store/video-details.effects';

@NgModule({
  declarations: [VideosComponent],
  imports: [
    VideoDetailsComponent,
    CommonModule,
    StoreModule.forFeature(videoDetailsFeatureKey, videoDetailsReducer),
    EffectsModule.forFeature([VideoDetailsEffects]),
    RouterModule.forChild([
      {
        path: '',
        component: VideosComponent,
      },
      {
        path: ':id',
        component: VideoDetailsComponent,
      },
    ]),
  ],
})
export default class VideosModule {}
