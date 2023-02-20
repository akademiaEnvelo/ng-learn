import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  success() {
    alert('Sukces!');
  }

  error(msg: string) {
    console.log('wywołanie oryginalego serwisu!');
    alert('msg');
  }

  warning() {
    alert('Alert!');
  }
}

// this.alertService.success();
