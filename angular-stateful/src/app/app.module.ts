import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EpisodesComponent } from './episodes/episodes.component';
import { LoginComponent } from './auth';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ROUTES } from './app.routes';
import { CharactersComponent } from './characters.component';
import { EpisodeListItemComponent } from './episodes/episode-list-item.component';
import { TestCdComponent } from './test-cd.component';
import { MyEpisodesComponent } from './episodes/my-episodes.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EpisodesComponent,
    LoginComponent,
    CharactersComponent,
    EpisodeListItemComponent,
    TestCdComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES, {
      preloadingStrategy: PreloadAllModules,
    }),
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
