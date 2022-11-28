import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EpisodesListComponent } from './episodes-list/episodes-list.component';
import { CustomHttpInterceptor } from './http.interceptor';

@NgModule({
  declarations: [AppComponent, EpisodesListComponent],
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
          console.log('tutaj też wchodzę!');
          return next.handle(request);
        },
      },
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
