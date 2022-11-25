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
import { Character } from '../app.component';

export interface AddToFav {
  id: number;
}

@Component({
  selector: 'app-character-list',
  template: `
    <div *ngFor="let character of list">
      {{ character.name }}

      <button (click)="addToFav.emit({ id: character.id })">add to favs</button>
    </div>
  `,
  styles: [],
})
export class CharacterListComponent implements OnInit, OnChanges, OnDestroy {
  @Input() list: Character[] = [];
  @Output() addToFav = new EventEmitter<AddToFav>();
  ngOnChanges(changes: SimpleChanges) {}

  ngOnInit() {}

  ngOnDestroy() {}

  onAddToFav(character: Character, event: Event) {
    this.addToFav.emit({ id: character.id });
  }
}
