import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MarkdownModule, MarkedOptions, MarkedRenderer } from 'ngx-markdown';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilterComponent } from './operators/filter.component';
import { MapComponent } from './operators/map.component';
import { CommonModule } from '@angular/common';
import { TapComponent } from './operators/tap.component';
import { OfComponent } from './operators/of.component';
import { SwitchMapComponent } from './operators/switch-map.component';
import { ConcatMapComponent } from './operators/concat-map.component';
import { CombineLatestComponent } from './operators/combine-latest.component';
import { DistinctUntilChangedComponent } from './operators/distinct-until-changed.component';
import { StartWithComponent } from './operators/start-with.component';
import { DebounceTimeComponent } from './operators/debounce-time.component';
import { CatchErrorComponent } from './operators/catch-erro.component';
import { RetryComponent } from './operators/retry.component';
import { TakeComponent } from './operators/take.component';

const operatorsCmps = [
  MapComponent,
  FilterComponent,
  TapComponent,
  OfComponent,
  SwitchMapComponent,
  ConcatMapComponent,
  CombineLatestComponent,
  DistinctUntilChangedComponent,
  StartWithComponent,
  DebounceTimeComponent,
  CatchErrorComponent,
  RetryComponent,
  TakeComponent,
];

export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();

  renderer.blockquote = (text: string) => {
    return '<blockquote class="blockquote"><p>' + text + '</p></blockquote>';
  };

  return {
    renderer: renderer,
    gfm: true,
    breaks: false,
    pedantic: false,
    smartLists: true,
    smartypants: false,
  };
}

@NgModule({
  declarations: [AppComponent, operatorsCmps],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MarkdownModule.forRoot({
      loader: HttpClient,
      markedOptions: {
        provide: MarkedOptions,
        useFactory: markedOptionsFactory,
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
