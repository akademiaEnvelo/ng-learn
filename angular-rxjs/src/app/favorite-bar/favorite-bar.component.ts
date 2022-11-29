import { Component, Input } from '@angular/core';
import { FavsService } from '../favs.service';

@Component({
  selector: 'app-favorite-bar',
  template: `
    <p>favorite-bar works! current count: {{ favService.favCount * 2 }}</p>
  `,
  styles: [],
})
export class FavoriteBarComponent {
  @Input() count = this.favService.favCount;

  constructor(public favService: FavsService) {}

  displayCount() {}

  ngOnInit() {
    // this.favService.favsCount$$.subscribe((value) => {
    //   this.count = value;
    // });
  }
}
