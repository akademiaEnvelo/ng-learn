import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-characters-details',
  template: ` <p>characters-details works!</p> `,
  styles: [],
})
export class CharactersDetailsComponent {
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params) => console.log(params));

    console.log(this.route.snapshot.params['id']);

    console.log(this.route.data);
  }
}
