import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavsService {
  favCount = 0;
  favsCount$$ = new BehaviorSubject<number>(0);

  constructor() {}
}
