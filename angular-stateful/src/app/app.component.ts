import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `{{ log() }}<router-outlet></router-outlet>`,
})
export class AppComponent {
  log() {
    // console.log('render appcomponent');
  }
}
