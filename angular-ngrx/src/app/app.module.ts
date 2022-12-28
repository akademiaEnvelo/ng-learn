import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { VideosComponent } from './videos/videos.component';
import { VideoDetailsComponent } from './videos/details/video-details.component';
import { StoreModule } from '@ngrx/store';
import { videoDetailsReducer } from './videos/details/store/video-details.reducer';
import { VideoDetailsState } from './videos/details/store/video-details.state';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HomeComponent,
        children: [
          {
            path: '',
            redirectTo: 'videos',
            pathMatch: 'full',
          },
          {
            path: 'videos',
            component: VideosComponent,
          },
          {
            path: 'videos/:id',
            component: VideoDetailsComponent,
          },
        ],
      },
    ],
  },
];

export interface AppState {
  videoDetails: VideoDetailsState;
}

@NgModule({
  declarations: [AppComponent, HomeComponent, VideosComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    VideoDetailsComponent,
    StoreModule.forRoot({
      videoDetails: videoDetailsReducer,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
