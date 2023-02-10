import { inject, NgModule } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterModule,
  RouterState,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { CatchErrorComponent } from './operators/catch-erro.component';
import { CombineLatestComponent } from './operators/combine-latest.component';
import { ConcatMapComponent } from './operators/concat-map.component';
import { DebounceTimeComponent } from './operators/debounce-time.component';
import { DistinctUntilChangedComponent } from './operators/distinct-until-changed.component';
import { FilterComponent } from './operators/filter.component';
import { MapComponent } from './operators/map.component';
import { OfComponent } from './operators/of.component';
import { RetryComponent } from './operators/retry.component';
import { StartWithComponent } from './operators/start-with.component';
import { SwitchMapComponent } from './operators/switch-map.component';
import { TakeComponent } from './operators/take.component';
import { TapComponent } from './operators/tap.component';

const titleResolver: ResolveFn<string> = ({
  routeConfig,
}: ActivatedRouteSnapshot) => `Operators: ${routeConfig?.path || '-'}`;

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'map',
        pathMatch: 'full',
      },
      {
        path: 'map',
        component: MapComponent,
        title: titleResolver,
      },
      {
        path: 'filter',
        component: FilterComponent,
        title: titleResolver,
      },
      {
        path: 'tap',
        component: TapComponent,
        title: titleResolver,
      },
      {
        path: 'of',
        component: OfComponent,
        title: titleResolver,
      },
      {
        path: 'switchMap',
        component: SwitchMapComponent,
        title: titleResolver,
      },
      {
        path: 'concatMap',
        component: ConcatMapComponent,
        title: titleResolver,
      },
      {
        path: 'combineLatest',
        component: CombineLatestComponent,
        title: titleResolver,
      },
      {
        path: 'distinctUntilChanged',
        component: DistinctUntilChangedComponent,
        title: titleResolver,
      },
      {
        path: 'startWith',
        component: StartWithComponent,
        title: titleResolver,
      },
      {
        path: 'debounceTime',
        component: DebounceTimeComponent,
        title: titleResolver,
      },
      {
        path: 'catchError',
        component: CatchErrorComponent,
        title: titleResolver,
      },
      {
        path: 'retry',
        component: RetryComponent,
        title: titleResolver,
      },
      {
        path: 'take',
        component: TakeComponent,
        title: titleResolver,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
