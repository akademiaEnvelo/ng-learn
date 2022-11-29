import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EpisodesListComponent } from './episodes-list/episodes-list.component';
import { CustomHttpInterceptor } from './http.interceptor';
import { RxjsBasicsComponent } from './rxjs-basics/rxjs-basics.component';
import { SubjectsBasicsComponent } from './subjects-basics/subjects-basics.component';
import { FavoriteBarComponent } from './favorite-bar/favorite-bar.component';

@NgModule({
  declarations: [AppComponent, EpisodesListComponent, RxjsBasicsComponent, SubjectsBasicsComponent, FavoriteBarComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useValue: {
        intercept(request: any, next: any) {
          // console.log('tutaj też wchodzę!');
          return next.handle(request);
        },
      },
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
