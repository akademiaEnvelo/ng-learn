import { Component, Directive } from '@angular/core';
import { AddToFav } from './character-list/character-list.component';

export interface Character {
  name: string;
  id: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  currentClass = 'uppercase';
  showh2 = true;

  characters: Character[] = [];

  addAnotherClass = true;

  loading = false;

  toggleClassName() {
    this.currentClass =
      this.currentClass === 'uppercase' ? 'capitalize' : 'uppercase';

    this.showh2 = !this.showh2;
  }

  handleAddedToFav(event: AddToFav) {
    console.log(event);
  }

  ngOnInit() {
    this.loading = true;
    fetch('https://rickandmortyapi.com/api/character')
      .then((res) => res.json())
      .then((response: { results: Character[]; info: any }) => {
        this.characters = response.results;
        this.loading = false;
      });
  }
}

@Directive({
  selector: '[ngIf]',
})
export class SampleDirective {}
