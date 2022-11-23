import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-start';

  first = true;

  ngOnInit() {
    setTimeout(() => {
      this.title = 'nowy tytuł';
    }, 5000);
  }
}
