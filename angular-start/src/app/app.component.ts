import { Component, Directive } from '@angular/core';
import { ApiService } from './api.service';
import { AddToFav } from './character-list/character-list.component';
import { MultiService } from './multi.service';

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
  // service: ApiService;

  currentClass = 'uppercase';
  showh2 = true;

  characters: Character[] = [];

  addAnotherClass = true;

  loading = false;

  constructor(private apiService: ApiService, private multi: MultiService) {}

  toggleClassName() {
    this.currentClass =
      this.currentClass === 'uppercase' ? 'capitalize' : 'uppercase';

    this.showh2 = !this.showh2;
  }

  toggleServiceEndpoint() {
    this.apiService.endpoint = 'location';
  }

  handleAddedToFav(event: AddToFav) {
    console.log(event);
  }

  fetchCharacters() {
    this.loading = true;
    this.apiService.getCharacters().then((response) => {
      this.characters = response.results;
      this.loading = false;
    });
  }

  ngOnInit() {}
}

@Directive({
  selector: '[ngIf]',
})
export class SampleDirective {}
