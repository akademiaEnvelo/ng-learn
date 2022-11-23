import { JsonPipe, UpperCasePipe } from '@angular/common';
import {
  AfterContentInit,
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';

interface Titled {
  getTitle(): string;
}

@Component({
  selector: 'app-character-list',
  template: ` <p>{{ label | json | uppercase }}</p> `,
  styles: [],
})
export class CharacterListComponent implements OnInit, OnChanges, OnDestroy {
  @Input() label = 'a';
  @Input() another = false;

  heading = 'Lista Postaci';

  constructor() {
    console.log(this.label.length);
  }

  getTitle() {
    return 'Lepsza listę postaci';
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('on changes', changes);
  }

  ngOnInit() {
    console.log(this.label.length);
  }

  likeAPipe() {
    return JSON.stringify(this.label.toUpperCase());
  }

  ngOnDestroy() {}
}
