import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { VideosComponent } from './videos/videos.component';
import { VideoDetailsComponent } from './videos/details/video-details.component';

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

@NgModule({
  declarations: [AppComponent, HomeComponent, VideosComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    VideoDetailsComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
