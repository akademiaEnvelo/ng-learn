import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-characters',
  template: `
    characters
    <p *ngFor="let y of x; trackBy: trackById">characters works!</p>
    <textarea *ngIf="y"></textarea>
  `,
  styles: [],
})
export class CharactersComponent {
  @Input() x: number[] = [];
  @Input() y!: Record<string, any>;

  trackById(id: number) {
    return id;
  }
}
