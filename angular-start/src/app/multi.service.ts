import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MultiService {
  state = {};
  constructor() {
    console.log('multi is ready', Math.random());
  }

  ngOnDestroy() {}
}
