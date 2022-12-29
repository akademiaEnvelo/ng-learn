import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { VideosComponent } from './videos/videos.component';
import { VideoDetailsComponent } from './videos/details/video-details.component';
import { StoreModule } from '@ngrx/store';
import { videoDetailsReducer } from './videos/details/store/video-details.reducer';
import { VideoDetailsState } from './videos/details/store/video-details.state';
import { SettingsState } from './settings/store/settings.state';
import { EffectsModule } from '@ngrx/effects';

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
            loadChildren: () => import('./videos/videos.module'),
          },
          {
            path: 'settings',
            loadChildren: () => import('./settings/settings.module'),
          },
        ],
      },
    ],
  },
];

export interface AppState {
  videoDetails?: VideoDetailsState;
  settings?: SettingsState;
}

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
