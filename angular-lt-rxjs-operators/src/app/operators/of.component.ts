import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { of, Subject, tap } from 'rxjs';

@Component({
  selector: 'app-of',
  template: `
    <div class="flex">
      <div class="w-1/2">
        <ol>
          <li *ngFor="let character of characters$ | async">
            <button (click)="({})">
              {{ character.name }}
            </button>
          </li>
        </ol>
      </div>

      <div class="w-1/2">
        <input [formControl]="ctrl" class="block bg-gray-400" />
        <p>Current {{ value$ | async }}</p>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfComponent {
  ctrl = new FormControl('');

  characters$ = of([
    {
      name: 'Pikachu',
    },
    {
      name: 'Squirtle',
    },
  ]).pipe(
    tap({
      next: () => {
        console.log('next');
      },
      complete: () => {
        console.log('complete');
      },
    })
  );

  value$ = this.ctrl.valueChanges;

  constructor() {
    const s = new Subject<void>();

    s.subscribe({
      next: () => {
        console.log('new value');
      },
      complete: () => {
        console.log('s completed?');
      },
    });
    s.next();
    s.next();
    s.next();
    s.complete();
  }
}
