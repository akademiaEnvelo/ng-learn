import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ApiService } from '../api.service';
import { Character } from '../app.component';
import { MultiService } from '../multi.service';

export interface AddToFav {
  id: number;
}

@Component({
  selector: 'app-character-list',
  template: `
    <p>{{ apiService.endpoint }}</p>
    <div *ngFor="let character of list">
      {{ character.name }}

      <button (click)="addToFav.emit({ id: character.id })">add to favs</button>
    </div>
  `,
  styles: [],
  providers: [MultiService],
})
export class CharacterListComponent implements OnInit, OnChanges, OnDestroy {
  @Input() list: Character[] = [];
  @Output() addToFav = new EventEmitter<AddToFav>();

  constructor(public apiService: ApiService, private m: MultiService) {}

  ngOnChanges(changes: SimpleChanges) {}

  ngOnInit() {}

  ngOnDestroy() {}

  onAddToFav(character: Character, event: Event) {
    this.addToFav.emit({ id: character.id });
  }
}
