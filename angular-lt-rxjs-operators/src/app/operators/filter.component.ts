import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter } from 'rxjs';

@Component({
  selector: 'app-filter',
  template: `
    <div class="flex">
      <div class="w-1/2">
        <input [formControl]="ctrl" class="block bg-gray-400" />
        <p>Current: {{ value$ | async }}</p>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent {
  ctrl = new FormControl('', { nonNullable: true });

  value$ = this.ctrl.valueChanges.pipe(filter((value) => value.length > 5));
}
