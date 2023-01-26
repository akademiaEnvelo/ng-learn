import { ChangeDetectorRef, inject, ViewRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export function useNavigate() {
  const router = inject(Router);

  return router.navigate.bind(router);
}

export function useQueryParams<T = Params>() {
  const route = inject(ActivatedRoute);

  return route.queryParams as Observable<T>;
}

export function useDestroyToken() {
  const cdr = inject(ChangeDetectorRef) as ViewRef;
  const subj$$ = new ReplaySubject<void>(1);

  cdr.onDestroy(() => {
    subj$$.next();
    subj$$.complete();
  });

  return subj$$.asObservable();
}

export function useHttpPost(urlBase: string = '') {
  const http = inject(HttpClient);

  return <T, Body extends Record<any, any>>(
    url: string,
    body: Body,
    options: Record<any, any> = {}
  ) => {
    return http.post<T>(`${urlBase}${url}`, body, options);
  };
}

// characters.service.ts
class CharacterService {
  private http = inject(HttpClient);

  getCharacterById(id: number) {
    return this.http.get('' + id);
  }

  getCharacters() {
    return this.http.get('');
  }
}

//characters.service.ts
export function getCharacterById(id: number) {
  const http = inject(HttpClient);

  return http.get('' + id);
}

export function getCharacters() {
  const http = inject(HttpClient);

  return http.get('');
}

// component
characters$ = getCharacters();
