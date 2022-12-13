import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-characters',
  template: `
    characters
    <p *ngFor="let y of x">characters works!</p>
    <textarea *ngIf="y"></textarea>
  `,
  styles: [],
})
export class CharactersComponent {
  @Input() x: number[] = [];
  @Input() y: boolean = false;
}
