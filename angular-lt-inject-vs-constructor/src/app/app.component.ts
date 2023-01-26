import { Component } from '@angular/core';
import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { useDestroyToken, useNavigate, useQueryParams } from './inject-hooks';

function useStore(selector) {
  const store = inject(Store);

  return store.select(selector);
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private router = inject(ActivatedRoute);
  private navigate = useNavigate();

  queryParams$ = useQueryParams<{ name: string }>();

  ngOnInit() {
    this.queryParams$.pipe(takeUntil(this.destroy$)).subscribe((result) => {
      console.log(result);
    });
  }
}
