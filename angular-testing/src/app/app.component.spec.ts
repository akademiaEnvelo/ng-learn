import { EnvironmentInjector, inject, Injectable, InjectionToken } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AppComponent } from './app.component';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable()
export class Dep {
  value = 100;
}

const API_URL = new InjectionToken('API_URL', {
  factory: () => 'https://rickandmortyapi.com/api',
});

function useBaseUrl() {
  const url = inject(API_URL);

  return {
    url: new URL(url),
    combine: (endpoint: string) => new URL(endpoint, url),
  };
}

@Injectable()
export class TestService {
  private dep = inject(Dep).value;
  private http = inject(HttpClient);
  private url = inject(API_URL);
  private router = inject(Router);

  getSth() {
    return this.dep;
  }

  getCharacters(name: string) {
    const url = new URL(this.url + '/character');
    url.searchParams.set('name', name.toLocaleLowerCase());

    return this.http.get(url.href).pipe(
      tap(() => {
        console.log('wtf?');
        this.router.navigate([name.toLowerCase()]);
      })
    );
  }
}

const routerMock = {
  navigate: () => {},
};

jest.spyOn(routerMock, 'navigate');

describe('TestService', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        TestService,
        { provide: Dep, useValue: { value: 3 } },
        {
          provide: Router,
          useValue: routerMock,
        },
      ],
      imports: [HttpClientTestingModule],
    });
  });
  it('test', (done) => {
    const url = new URL('https://rickandmortyapi.com/api/character');

    url.searchParams.set('name', 'Rick'.toLocaleLowerCase());

    const base = new URL('http://localhost:4200');

    const withBase = new URL('api', base);

    console.log(withBase.href);

    const service = TestBed.inject(EnvironmentInjector).get(TestService);
    const httpController = TestBed.inject(HttpTestingController);

    service.getCharacters('Rick').subscribe(
      (res) => {
        console.log(res);
        expect(res).toEqual({});
        expect(routerMock.navigate).toBeCalledWith(['rickz']);
        done();
      },
      (err: HttpErrorResponse) => {
        expect(err.statusText).toEqual('Error');
        done();
      }
    );

    const req = httpController.expectOne('https://rickandmortyapi.com/api/character?name=rick');

    // req.flush({}, { status: 404, statusText: 'Error' });
    req.flush({});

    // expect(service.getSth()).toBe(4);
  });
});

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.title = 'siema';

    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-testing'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-testing');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('angular-testing app is running!');
  });
});
